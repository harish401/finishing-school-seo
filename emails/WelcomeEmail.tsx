import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  studentName?: string;
}

export const WelcomeEmail = ({
  studentName = "Aravind Sharma",
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Unique Mentors finishing school: Shapen your path to leadership</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header Logo */}
        <Section style={header}>
          <Text style={logoText}>U</Text>
          <Text style={logoLabel}>UNIQUE MENTORS</Text>
        </Section>

        {/* Content Body */}
        <Section style={content}>
          <Text style={greeting}>A Heartfelt Welcome to You, {studentName}!</Text>
          <Text style={paragraph}>
            We are absolutely thrilled to welcome you to the Unique Mentors finishing school community. Our mission is to bridge the gap between academic theory and practical corporate or professional excellence, shaping you into a confident, polished leader.
          </Text>

          {/* Quick Start Guide */}
          <Section style={guideBox}>
            <Text style={guideHeader}>3 Steps to Kickstart Your Journey</Text>
            
            <div style={stepRow}>
              <div style={stepNumber}>1</div>
              <div style={stepContent}>
                <strong style={stepTitle}>Access Your Portal</strong>
                <p style={stepDescription}>Log in to your student dashboard to review schedules and training materials.</p>
              </div>
            </div>

            <div style={stepRow}>
              <div style={stepNumber}>2</div>
              <div style={stepContent}>
                <strong style={stepTitle}>Meet Your Personal Mentor</strong>
                <p style={stepDescription}>Your assigned mentor will establish a 1-on-1 contact session to outline your goals.</p>
              </div>
            </div>

            <div style={stepRow}>
              <div style={stepNumber}>3</div>
              <div style={stepContent}>
                <strong style={stepTitle}>Attend Orientation</strong>
                <p style={stepDescription}>Join the live orientation webinar to integrate with peer students.</p>
              </div>
            </div>
          </Section>

          {/* Call to Action */}
          <Section style={btnContainer}>
            <Button style={button} href="https://uniquementors.in/student/dashboard">
              Access Your Student Portal
            </Button>
          </Section>

          <Text style={paragraph}>
            Remember, transformation is a progressive journey. Be curious, stay committed, and embrace the learn-by-doing workspace.
          </Text>

          <Hr style={divider} />

          <Text style={footerText}>
            Unique Mentors finishing school, 123 Heights, Bengaluru, KA - 560001<br />
            Have questions? Reply to this email or write to <a href="mailto:welcome@uniquementors.com" style={link}>welcome@uniquementors.com</a>.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: "#f9f9ff",
  fontFamily: "Inter, sans-serif",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #c7c4d8",
  borderRadius: "16px",
  margin: "0 auto",
  maxWidth: "580px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.05)",
};

const header = {
  background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)",
  padding: "30px 40px",
  textAlign: "center" as const,
};

const logoText = {
  background: "#ffffff",
  borderRadius: "6px",
  color: "#3525cd",
  display: "inline-block",
  fontSize: "20px",
  fontWeight: "bold",
  height: "36px",
  lineHeight: "36px",
  margin: "0",
  width: "36px",
  textAlign: "center" as const,
};

const logoLabel = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "0.15em",
  margin: "10px 0 0 0",
};

const content = {
  padding: "40px",
};

const greeting = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#151c27",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#464555",
  marginBottom: "24px",
};

const guideBox = {
  backgroundColor: "#f9f9ff",
  border: "1px solid #c7c4d8",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px",
};

const guideHeader = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#151c27",
  margin: "0 0 20px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const stepRow = {
  display: "flex",
  alignItems: "flex-start",
  margin: "16px 0",
};

const stepNumber = {
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: "#3525cd",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "12px",
  marginTop: "2px",
  flexShrink: 0,
};

const stepContent = {
  display: "flex",
  flexDirection: "column" as const,
};

const stepTitle = {
  fontSize: "14px",
  color: "#151c27",
};

const stepDescription = {
  fontSize: "13px",
  color: "#7e7c8c",
  margin: "4px 0 0 0",
  lineHeight: "1.4",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  background: "linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "12px 24px",
  textDecoration: "none",
  display: "inline-block",
  boxShadow: "0 4px 10px rgba(53, 37, 205, 0.2)",
};

const divider = {
  borderColor: "#e6e5f0",
  margin: "30px 0",
};

const footerText = {
  fontSize: "12px",
  color: "#7e7c8c",
  lineHeight: "1.5",
  textAlign: "center" as const,
};

const link = {
  color: "#3525cd",
  textDecoration: "underline",
};
