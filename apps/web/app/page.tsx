import { StubBanner } from '@/components/StubBanner';
import {
  EcosystemTeaser,
  MarketplacePhilosophyTeaser,
} from '@/components/marketing/EcosystemSections';
import {
  HeroSection,
  LinksTeaserSection,
  PassionSection,
  RadioTeaserSection,
} from '@/components/marketing/HomeSections';
import Link from 'next/link';
import { whatWereNotIntro } from '@/lib/site-content';

export default function HomePage() {
  return (
    <>
      <StubBanner />
      <HeroSection />
      <section className="panel philosophy-teaser">
        <h2>{whatWereNotIntro.title}</h2>
        <p>{whatWereNotIntro.lead}</p>
        <Link className="btn btn--ghost" href="/philosophy">
          Read the full philosophy
        </Link>
      </section>
      <div className="home-grid">
        <PassionSection />
        <MarketplacePhilosophyTeaser />
        <RadioTeaserSection />
        <EcosystemTeaser />
        <LinksTeaserSection />
      </div>
    </>
  );
}
