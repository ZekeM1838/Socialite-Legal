"use client";

import LegalPageLayout from "../../components/LegalPageLayout";

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="COOKIE_POLICY"
      subtitle="This Cookie Policy explains how Socialite uses cookies and similar tracking technologies."
      lastUpdated="DECEMBER_2025"
    >
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are stored on your device when you visit a website or
        use an application. They are widely used to make websites work more efficiently and
        provide information to the owners of the site.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>We use cookies and similar technologies for several purposes:</p>

      <h3>2.1 Essential Cookies</h3>
      <p>
        These cookies are necessary for the Service to function properly. They enable core
        functionality such as security, network management, and account access. You cannot
        opt out of these cookies.
      </p>
      <ul>
        <li>Authentication and session management</li>
        <li>Security and fraud prevention</li>
        <li>Load balancing and performance</li>
      </ul>

      <h3>2.2 Functional Cookies</h3>
      <p>
        These cookies enable enhanced functionality and personalization, such as remembering
        your preferences and settings.
      </p>
      <ul>
        <li>Language preferences</li>
        <li>Theme and display settings</li>
        <li>Remembering login details (if you choose)</li>
      </ul>

      <h3>2.3 Analytics Cookies</h3>
      <p>
        These cookies help us understand how visitors interact with our Service by collecting
        and reporting information anonymously.
      </p>
      <ul>
        <li>Page views and navigation patterns</li>
        <li>Time spent on pages</li>
        <li>Error tracking and performance monitoring</li>
        <li>Feature usage statistics</li>
      </ul>

      <h3>2.4 Advertising Cookies</h3>
      <p>
        These cookies may be set through our Service by advertising partners to build a profile
        of your interests and show you relevant advertisements.
      </p>
      <ul>
        <li>Interest-based advertising</li>
        <li>Ad performance measurement</li>
        <li>Retargeting</li>
      </ul>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Some cookies are placed by third-party services that appear on our pages. We do not
        control the use of these cookies. Third parties that may set cookies include:
      </p>
      <ul>
        <li>Analytics providers (e.g., Google Analytics)</li>
        <li>Social media platforms</li>
        <li>Advertising networks</li>
        <li>Content delivery networks</li>
      </ul>

      <h2>4. Cookie Duration</h2>
      <p>Cookies can be classified by how long they last:</p>
      <ul>
        <li>
          <strong>Session Cookies:</strong> These are temporary and expire when you close your
          browser or app.
        </li>
        <li>
          <strong>Persistent Cookies:</strong> These remain on your device for a set period or
          until you delete them.
        </li>
      </ul>

      <h2>5. Your Cookie Choices</h2>
      <p>You have several options to manage cookies:</p>

      <h3>5.1 Browser Settings</h3>
      <p>
        Most web browsers allow you to control cookies through their settings. You can typically:
      </p>
      <ul>
        <li>View cookies stored on your device</li>
        <li>Delete all or specific cookies</li>
        <li>Block cookies from all or specific websites</li>
        <li>Block third-party cookies</li>
        <li>Accept or reject cookies on a case-by-case basis</li>
      </ul>

      <h3>5.2 Mobile Device Settings</h3>
      <p>
        Mobile devices provide settings to limit ad tracking and reset advertising identifiers.
        Check your device settings for options like &quot;Limit Ad Tracking&quot; (iOS) or &quot;Opt out of
        Ads Personalization&quot; (Android).
      </p>

      <h3>5.3 Opt-Out Tools</h3>
      <p>
        You can opt out of interest-based advertising from participating companies through:
      </p>
      <ul>
        <li>Digital Advertising Alliance (DAA): optout.aboutads.info</li>
        <li>Network Advertising Initiative (NAI): optout.networkadvertising.org</li>
        <li>European Interactive Digital Advertising Alliance (EDAA): youronlinechoices.eu</li>
      </ul>

      <h2>6. Impact of Disabling Cookies</h2>
      <p>
        If you choose to disable cookies, some features of our Service may not function properly.
        Essential cookies cannot be disabled as they are necessary for the Service to work.
      </p>

      <h2>7. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. We will notify you of any changes
        by posting the new policy on this page and updating the &quot;last updated&quot; date.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about our use of cookies, please contact us at:{" "}
        <a href="mailto:privacy@socialite.app">privacy@socialite.app</a>
      </p>
    </LegalPageLayout>
  );
}
