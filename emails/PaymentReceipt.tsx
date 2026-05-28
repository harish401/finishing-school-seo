import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ReceiptEmailProps {
  studentName?: string;
  courseName?: string;
  amount?: number;
  paymentId?: string;
  date?: string;
}

export const PaymentReceipt = ({
  studentName = "Aravind Sharma",
  courseName = "Campus to Career Transformation Program",
  amount = 12000,
  paymentId = "pay_Rzp123456789",
  date = "May 26, 2026",
}: ReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>Payment Receipt: Branded educational investment statement</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header Logo */}
        <Section style={header}>
          <Text style={logoText}>U</Text>
          <Text style={logoLabel}>UNIQUE MENTORS</Text>
        </Section>

        {/* Content Body */}
        <Section style={content}>
          <Text style={greeting}>Thank you for your payment, {studentName}!</Text>
          <Text style={paragraph}>
            This email serves as a official payment confirmation receipt for your professional course registration at Unique Mentors finishing school.
          </Text>

          {/* Receipt Details Box */}
          <Section style={receiptBox}>
            <div style={flexRow}>
              <span style={label}>Receipt Date:</span>
              <span style={value}>{date}</span>
            </div>
            <div style={flexRow}>
              <span style={label}>Transaction ID:</span>
              <span style={value}><code>{paymentId}</code></span>
            </div>
            <div style={flexRow}>
              <span style={label}>Status:</span>
              <span style={statusBadge}>COMPLETED</span>
            </div>
            <Hr style={innerDivider} />
            <div style={flexRow}>
              <span style={label}><strong>Item / Course:</strong></span>
              <span style={value}>{courseName}</span>
            </div>
            <Hr style={innerDivider} />
            <div style={flexRowTotal}>
              <span style={totalLabel}>Total Investment:</span>
              <span style={totalValue}>₹{amount.toLocaleString("en-IN")}.00</span>
            </div>
          </Section>

          <Text style={paragraph}>
            Your secure billing statement is available for download at any time through your student portal profile credentials.
          </Text>

          <Hr style={divider} />

          <Text style={footerText}>
            Unique Mentors finishing school, 123 Heights, Bengaluru, KA - 560001<br />
            Need assistance with billing? Contact us at <a href="mailto:billing@uniquementors.com" style={link}>billing@uniquementors.com</a>.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PaymentReceipt;

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

const receiptBox = {
  backgroundColor: "#f9f9ff",
  border: "1px solid #c7c4d8",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px",
};

const flexRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "8px 0",
  fontSize: "14px",
};

const flexRowTotal = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "12px",
};

const label = {
  color: "#7e7c8c",
};

const value = {
  color: "#151c27",
  fontWeight: "500",
  textAlign: "right" as const,
};

const statusBadge = {
  color: "#10b981",
  background: "rgba(16, 185, 129, 0.1)",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "bold",
};

const totalLabel = {
  fontSize: "15px",
  fontWeight: "bold",
  color: "#151c27",
};

const totalValue = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#3525cd",
};

const innerDivider = {
  borderColor: "#e6e5f0",
  margin: "12px 0",
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
