import LegalPageLayout from "../../components/LegalPageLayout";
import type { Metadata } from "next";

// Force static generation
export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules and agreements for using the Socialite application",
  openGraph: {
    title: "Terms of Service | Socialite",
    description: "The rules and agreements for using the Socialite application",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="TERMS_OF_SERVICE"
      subtitle="Please read these Terms of Service carefully before using the Socialite application."
      lastUpdated="DECEMBER_2025"
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Socialite application (&quot;Service&quot;), you agree to be bound by these
        Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 13 years old to use our Service. By using the Service, you represent
        and warrant that you meet all eligibility requirements. If you are under 18, you must have
        parental or guardian consent.
      </p>

      <h2>3. Account Registration</h2>
      <p>
        To use certain features of the Service, you must register for an account. You agree to:
      </p>
      <ul>
        <li>Provide accurate, current, and complete information</li>
        <li>Maintain and update your information to keep it accurate</li>
        <li>Maintain the security of your account credentials</li>
        <li>Accept responsibility for all activities under your account</li>
        <li>Notify us immediately of any unauthorized use</li>
      </ul>

      <h2>4. User Content</h2>
      <p>
        You retain ownership of content you submit, post, or display on or through the Service
        (&quot;User Content&quot;). By posting User Content, you grant us a non-exclusive, worldwide,
        royalty-free license to use, copy, modify, and display such content.
      </p>

      <h3>4.1 Content Standards</h3>
      <p>You agree not to post content that:</p>
      <ul>
        <li>Is illegal, harmful, threatening, abusive, or harassing</li>
        <li>Is defamatory, vulgar, obscene, or invasive of privacy</li>
        <li>Infringes any intellectual property rights</li>
        <li>Contains software viruses or malicious code</li>
        <li>Impersonates any person or entity</li>
        <li>Violates our Community Guidelines</li>
      </ul>

      <h2>5. Prohibited Activities</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for any illegal purpose</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with or disrupt the Service</li>
        <li>Use automated means to access the Service</li>
        <li>Collect user information without consent</li>
        <li>Engage in any activity that could damage our reputation</li>
      </ul>

      <h2>6. Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are owned by Socialite
        and are protected by international copyright, trademark, patent, trade secret, and other
        intellectual property laws.
      </p>

      <h2>7. Termination</h2>
      <p>
        We may terminate or suspend your account and access to the Service immediately, without
        prior notice or liability, for any reason, including breach of these Terms. Upon
        termination, your right to use the Service will immediately cease.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
        EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
        SECURE, OR ERROR-FREE.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, SOCIALITE SHALL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS,
        DATA, OR GOODWILL.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Socialite and its officers, directors, employees,
        and agents from any claims, damages, losses, liabilities, and expenses arising from your
        use of the Service or violation of these Terms.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the State
        of California, without regard to its conflict of law provisions.
      </p>

      <h2>12. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. We will notify you of any changes
        by posting the new Terms on this page and updating the &quot;last updated&quot; date.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at:{" "}
        <a href="mailto:support@socialite.world">support@socialite.world</a>
      </p>
    </LegalPageLayout>
  );
}
