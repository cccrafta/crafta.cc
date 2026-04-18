import StaticPage from "@/components/static-page";

export const metadata = {
  title: "Privacy Policy — crafta.cc",
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>Last updated: April 2026.</p>

      <p>
        Crafta Journal is an editorial publication about garments, materials,
        craft techniques, and fashion culture. This policy explains how we
        handle information when you visit crafta.cc.
      </p>

      <p>
        We do not collect personal data beyond what is standard for any web
        server (IP addresses in server logs, which are retained briefly for
        security purposes). We do not use tracking cookies or third-party
        advertising.
      </p>

      <p>
        Comments on posts are handled through WordPress. If you leave a comment,
        your name and comment content are stored on our servers. We do not share
        this information with third parties.
      </p>

      <p>
        For questions about this policy, contact us via Instagram at{" "}
        <a
          href="https://instagram.com/crafta.cc"
          className="transition-opacity hover:opacity-60"
          style={{ color: "var(--color-accent)" }}
        >
          @crafta.cc
        </a>
        .
      </p>
    </StaticPage>
  );
}
