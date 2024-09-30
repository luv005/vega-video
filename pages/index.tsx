import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9fafb;
    color: #111827;
  }
`;

const IndexPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Logo>Vega Video</Logo>
          <Nav>
            {isClient && (
              <>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
                <NavLink href="#api">API</NavLink>
                <CTAButton>Sign up for free</CTAButton>
              </>
            )}
          </Nav>
        </Header>

        <HeroSection>
          <HeroContent>
            <HeroTitle>Generate engaging AI videos</HeroTitle>
            <HeroSubtitle>Get a perfect video for social media of you or a generic avatar in 2 minutes</HeroSubtitle>
            {isClient && (
              <Link href="/create" passHref>
                <CTAButton as="a" $large>Join Now</CTAButton>
              </Link>
            )}
          </HeroContent>
          <HeroBackground />
        </HeroSection>

        <FeaturesSection>
          <SectionTitle>Leverage the highest performing media</SectionTitle>
          <SectionSubtitle>Develop your brand with AI UGC, educate, or become the next big creator</SectionSubtitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>🚀</FeatureIcon>
              <FeatureTitle>Promotion</FeatureTitle>
              <FeatureDescription>Pick the most engaging avatar & produce cheap UGC ads for physical products & software</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🎓</FeatureIcon>
              <FeatureTitle>Education</FeatureTitle>
              <FeatureDescription>Make learning fun with Masterclasses, training videos & lively FAQs</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🎭</FeatureIcon>
              <FeatureTitle>Entertainment</FeatureTitle>
              <FeatureDescription>Create the next big Youtube channel by leveraging our creative controls</FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesSection>

        <AvatarsSection>
          <SectionTitle>Our AI Avatars</SectionTitle>
          <SectionSubtitle>Take advantage of our lively and engaging avatars to represent your brand and spread the word</SectionSubtitle>
          <AvatarGrid>
            <AvatarCard>
              <AvatarImage src="/avatar1.jpg" alt="Avatar 1" />
            </AvatarCard>
            <AvatarCard>
              <AvatarImage src="/avatar2.jpg" alt="Avatar 2" />
            </AvatarCard>
            <AvatarCard>
              <AvatarImage src="/avatar3.jpg" alt="Avatar 3" />
            </AvatarCard>
          </AvatarGrid>
        </AvatarsSection>

        <PricingSection>
          <SectionTitle>Get started today</SectionTitle>
          <SectionSubtitle>-30% for yearly commits</SectionSubtitle>
          <PricingGrid>
            <PricingCard>
              <PricingTitle>Free plan</PricingTitle>
              <PricingPrice>$0<span>/month</span></PricingPrice>
              <PricingFeatures>
                <PricingFeature>No custom avatars</PricingFeature>
                <PricingFeature>2 video minutes</PricingFeature>
                <PricingFeature>Access to basic avatars</PricingFeature>
              </PricingFeatures>
              <CTAButton>Get started</CTAButton>
            </PricingCard>
            {/* Add more pricing cards here */}
          </PricingGrid>
        </PricingSection>

        <APISection>
          <SectionTitle>Scale with our API</SectionTitle>
          <SectionSubtitle>Create videos at scale by leveraging our API</SectionSubtitle>
          <CTAButton $large>Join the beta</CTAButton>
        </APISection>

        <Footer>
          <FooterContent>
            {isClient && (
              <>
                <FooterSection>
                  <FooterTitle>Browse</FooterTitle>
                  <FooterLink href="#">Home</FooterLink>
                  <FooterLink href="#">Community</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>
                </FooterSection>
                <FooterSection>
                  <FooterTitle>Legal</FooterTitle>
                  <FooterLink href="#">Terms and Conditions</FooterLink>
                  <FooterLink href="#">Legal mentions</FooterLink>
                </FooterSection>
                <FooterSection>
                  <FooterTitle>Follow us</FooterTitle>
                  <SocialLinks>
                    <SocialLink href="#">Instagram</SocialLink>
                    <SocialLink href="#">Youtube</SocialLink>
                    <SocialLink href="#">X</SocialLink>
                    <SocialLink href="#">LinkedIn</SocialLink>
                  </SocialLinks>
                </FooterSection>
              </>
            )}
          </FooterContent>
        </Footer>
      </Container>
    </>
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
  position: relative;
  z-index: 10;
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
  margin-right: 20px;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
`;

const CTAButton = styled.button<{ $large?: boolean }>`
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: ${props => props.$large ? '12px 24px' : '8px 16px'};
  font-size: ${props => props.$large ? '18px' : '14px'};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4338ca;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #4f46e5, #818cf8);
  opacity: 0.1;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(45deg, #4f46e5, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  color: #6b7280;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  background: linear-gradient(45deg, #4f46e5, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 48px;
`;

const FeaturesSection = styled.section`
  padding: 80px 0;
  background-color: #ffffff;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
`;

const FeatureCard = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #4f46e5;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
`;

const AvatarsSection = styled.section`
  padding: 80px 0;
  background-color: #f9fafb;
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
`;

const AvatarCard = styled.div`
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AvatarImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 16px;
  object-fit: cover;
`;

const AvatarName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #4f46e5;
`;

const AvatarDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
`;

const PricingSection = styled.section`
  padding: 80px 0;
  background-color: #ffffff;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
`;

const PricingCard = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PricingTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #4f46e5;
`;

const PricingPrice = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #111827;

  span {
    font-size: 18px;
    font-weight: 400;
    color: #6b7280;
  }
`;

const PricingFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 24px;
`;

const PricingFeature = styled.li`
  margin-bottom: 8px;
  color: #6b7280;
`;

const APISection = styled.section`
  text-align: center;
  padding: 80px 0;
  background-color: #f9fafb;
`;

const Footer = styled.footer`
  background-color: #1f2937;
  color: #ffffff;
  padding: 64px 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #f9fafb;
`;

const FooterLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  margin-bottom: 8px;
  
  &:hover {
    color: #f9fafb;
  }
`;

const SocialLinks = styled.div`
  display: flex;
`;

const SocialLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  margin-right: 16px;
  
  &:hover {
    color: #f9fafb;
  }
`;

export default IndexPage;