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

interface EnrollmentEmailProps {
  studentName?: string;
  courseName?: string;
  startDate?: string;
  amount?: number;
}

export const EnrollmentConfirmation = ({
  studentName = "Aravind Sharma",
  courseName = "Campus to Career Transformation Program",
  startDate = "June 1, 2026",
  amount = 12000,
}: EnrollmentEmailProps) => (
  <Html>
    <Head />
    <Preview>Enrollment Confirmed: Start your finishing school transformation</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header Logo */}
        <Section style={header}>
          <Text style={logoText}>U</Text>
          <Text style={logoLabel}>UNIQUE MENTORS</Text>
        </Section>

        {/* Content Body */}
        <Section style={content}>
          <Text style={greeting}>Dear {studentName},</Text>
          <Text style={paragraph}>
            Congratulations! Your registration for the <strong style={boldText}>{courseName}</strong> has been successfully confirmed. You have taken a monumental step toward refining your professional caliber and leadership prowess.
          </Text>

          {/* Details Box */}
          <Section style={detailsBox}>
            <Text style={detailsHeader}>Course Enrollment Details</Text>
            <Hr style={divider} />
            <Text style={detailsText}>
              <strong>Program:</strong> {courseName}
            </Text>
            <Text style={detailsText}>
              <strong>Orientation Date:</strong> {startDate}
            </Text>
            <Text style={detailsText}>
              <strong>Amount Paid:</strong> ₹{amount.toLocaleString("en-IN")}
            </Text>
            <Text style={detailsText}>
              <strong>Portal Credentials:</strong> Same as registered email
            </Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href="https://uniquementors.org/student/dashboard">
              Go to Student Dashboard
            </Button>
          </Section>

          <Text style={paragraph}>
            Your assigned 1-on-1 mentor will connect with you shortly to schedule your orientation call and configure your workspace.
          </Text>

          <Hr style={divider} />

          <Text style={footerText}>
            Unique Mentors finishing school, 123 Heights, Bengaluru, KA - 560001<br />
            Need help? Contact our support at <a href="mailto:info@uniquementors.com" style={link}>info@uniquementors.com</a>.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EnrollmentConfirmation;

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

const boldText = {
  color: "#3525cd",
};

const detailsBox = {
  backgroundColor: "#f9f9ff",
  border: "1px solid #c7c4d8",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const detailsHeader = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#151c27",
  margin: "0 0 10px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const detailsText = {
  fontSize: "14px",
  color: "#464555",
  margin: "8px 0",
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
