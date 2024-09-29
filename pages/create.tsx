import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const CreatePage = () => {

  const [step, setStep] = useState(1);
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState('');

  // Define avatars array with video URLs
  const avatars = [
    { id: 1, image: '/avatars/avatar1.jpg', name: 'Avatar 1', videoUrl: 'https://vegasongs.s3.ap-southeast-1.amazonaws.com/videos/avatar1.mp4', voice: 'alloy' },
    { id: 2, image: '/avatars/avatar2.jpg', name: 'Avatar 2', videoUrl: 'https://vegasongs.s3.ap-southeast-1.amazonaws.com/videos/avatar2.mp4', voice: 'nova' },
    { id: 3, image: '/avatars/avatar3.jpg', name: 'Avatar 3' },
  ];

  const generateScript = () => {
    const generatedScript = "Vega, the brightest star in the constellation Lyra, is located about 25 light-years from Earth. It is a young, bluish-white star, hotter and more massive than the Sun. Vega has been key in star brightness studies and serves as an important reference point for astronomers and future space exploration.";
    setScript(generatedScript);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setSelectedVoice(avatar.voice);
  };

  const sendGooeyRequest = async () => {
    setIsLoading(true);
    setError('');
    setStep(3); // Move to step 3 immediately

    const payload = {
      "text_prompt": script,
      "tts_provider": "OPEN_AI",
      "openai_voice_name": selectedVoice,
      "openai_tts_model": "tts_1",
      "input_face": selectedAvatar.videoUrl,
      "selected_model": "Wav2Lip"
    };

    try {
      const response = await fetch("https://api.gooey.ai/v2/LipsyncTTS", {
        method: "POST",
        headers: {
          "Authorization": "bearer " + process.env.NEXT_PUBLIC_GOOEY_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API Error:", response.status, errorData);
        throw new Error(`Server error: ${response.status}. ${errorData?.message || ''}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      if (result.output && result.output.output_video) {
        setVideoUrl(result.output.output_video);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (e) {
      console.error("An error occurred:", e);
      setError(`Failed to generate video: ${e.message}. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Logo>Vega Video</Logo>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="#profile">Profile</NavLink>
        </Nav>
      </Header>

      <MainContent>
        <Sidebar>
          <StepIndicator active={step >= 1}>1. Choose your avatar</StepIndicator>
          <StepIndicator active={step >= 2}>2. Write your script</StepIndicator>
          <StepIndicator active={step >= 3}>3. Generate your video</StepIndicator>
        </Sidebar>

        <ContentArea>
          {step === 1 && (
            <StepContent>
              <h2>Step 1: Choose an Avatar</h2>
              <AvatarGrid>
                {avatars.map((avatar) => (
                  <AvatarItem
                    key={avatar.id}
                    onClick={() => handleAvatarSelect(avatar)}
                    selected={selectedAvatar && selectedAvatar.id === avatar.id}
                  >
                    <Image 
                      src={avatar.image} 
                      alt={avatar.name} 
                      width={300} 
                      height={200}
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.jpg'; // Fallback image
                        console.error(`Failed to load image: ${avatar.image}`);
                      }}
                    />
                  </AvatarItem>
                ))}
              </AvatarGrid>
              <Button onClick={() => setStep(2)} disabled={!selectedAvatar}>
                Next
              </Button>
            </StepContent>
          )}

          {step === 2 && (
            <StepContent>
              <h2>Write your script</h2>
              <GenerateScriptButton onClick={generateScript}>
                Write new script for me
              </GenerateScriptButton>
              <TextArea 
                placeholder="Enter your script here..." 
                rows={10} 
                value={script}
                onChange={(e) => setScript(e.target.value)}
              />
              <Button onClick={sendGooeyRequest} disabled={isLoading}>
                Next
              </Button>
            </StepContent>
          )}

          {step === 3 && (
            <StepContent>
              <h2>Generate your video</h2>
              {isLoading ? (
                <p>Your video is being generated. Please wait...</p>
              ) : error ? (
                <ErrorMessage>
                  {error}
                  <br />
                  If this error persists, please contact support.
                </ErrorMessage>
              ) : videoUrl ? (
                <div>
                  <p>Your video has been generated successfully!</p>
                  <video controls src={videoUrl} width="100%" />
                </div>
              ) : (
                <p>Preparing to generate your video...</p>
              )}
            </StepContent>
          )}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  margin-left: 20px;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
`;

const MainContent = styled.main`
  display: flex;
  margin-top: 40px;
`;

const Sidebar = styled.div`
  width: 250px;
  padding-right: 40px;
`;

const StepIndicator = styled.div<{ active: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.active ? '#4f46e5' : '#e5e7eb'};
  color: ${props => props.active ? '#ffffff' : '#4b5563'};
  border-radius: 5px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const ContentArea = styled.div`
  flex: 1;
`;

const StepContent = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const AvatarItem = styled.div<{ selected: boolean }>`
  background-color: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;

  &:hover {
    transform: scale(1.05);
  }

  ${props => props.selected && `
    background-color: #4f46e5;
    color: white;
  `}
`;

const AvatarCard = styled.div`
  background-color: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4338ca;
  }
`;

const GenerateScriptButton = styled.button`
  background-color: #10B981;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;

  &:hover {
    background-color: #059669;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export default CreatePage;