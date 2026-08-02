import { StubBanner } from '@/components/StubBanner';
import {
  HeroSection,
  LinksTeaserSection,
  MarketplaceTeaserSection,
  PassionSection,
  RadioTeaserSection,
} from '@/components/marketing/HomeSections';

export default function HomePage() {
  return (
    <>
      <StubBanner />
      <HeroSection />
      <div className="home-grid">
        <PassionSection />
        <RadioTeaserSection />
        <MarketplaceTeaserSection />
        <LinksTeaserSection />
      </div>
    </>
  );
}
