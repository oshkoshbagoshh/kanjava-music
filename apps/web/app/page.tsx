import Link from 'next/link';
import { StubBanner } from '@/components/StubBanner';
import {
  EcosystemTeaser,
  MarketplacePhilosophyTeaser,
} from '@/components/marketing/EcosystemSections';
import {
  HeritageTeaserSection,
  HeroSection,
  LinksTeaserSection,
  PassionSection,
  RadioTeaserSection,
} from '@/components/marketing/HomeSections';
import { whatWereNotIntro } from '@/lib/site-content';

export default function HomePage() {
  return (
    <>
      <StubBanner />
      <HeroSection />
      <div className="box mb-4">
        <h2 className="title is-5">{whatWereNotIntro.title}</h2>
        <div className="content">
          <p>{whatWereNotIntro.lead}</p>
        </div>
        <Link className="button is-light is-outlined is-small" href="/philosophy">
          Read the full philosophy
        </Link>
      </div>
      <div className="columns is-multiline">
        <div className="column is-12">
          <PassionSection />
        </div>
        <div className="column is-12-tablet is-6">
          <MarketplacePhilosophyTeaser />
        </div>
        <div className="column is-12-tablet is-6">
          <RadioTeaserSection />
        </div>
        <div className="column is-12-tablet is-6">
          <HeritageTeaserSection />
        </div>
        <div className="column is-12-tablet is-6">
          <EcosystemTeaser />
        </div>
        <div className="column is-12">
          <LinksTeaserSection />
        </div>
      </div>
    </>
  );
}
