
import React from 'react';
import { Button } from '../components/UI/Button';

const StyleGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-offwhite py-24 px-4">
      <div className="container mx-auto max-w-4xl space-y-24">
        {/* Intro */}
        <section className="space-y-6">
          <h1 className="text-5xl font-bold">Design System</h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Ultimate Watch Store follows a "Soft & Airy Minimalist" aesthetic. We use high-quality imagery, glassmorphism, and smooth animations to appeal to the Gen Z luxury market.
          </p>
        </section>

        {/* Colors */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-3">
              <div className="h-24 bg-primary rounded-3xl shadow-lg" />
              <p className="text-sm font-bold">Primary (#1A5276)</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-secondary rounded-3xl shadow-lg" />
              <p className="text-sm font-bold">Secondary (#2980B9)</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-accent rounded-3xl shadow-lg" />
              <p className="text-sm font-bold">Accent (#85C1E9)</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-highlight rounded-3xl shadow-lg" />
              <p className="text-sm font-bold">Highlight (#F7DC6F)</p>
            </div>
            <div className="space-y-3">
              <div className="h-24 bg-gold rounded-3xl shadow-lg" />
              <p className="text-sm font-bold">Gold (#D4AC0D)</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Typography</h2>
          <div className="space-y-6 bg-white p-10 rounded-4xl">
            <h1 className="text-6xl font-bold">Outfit Heading 1</h1>
            <h2 className="text-4xl font-bold">Outfit Heading 2</h2>
            <h3 className="text-2xl font-bold">Outfit Heading 3</h3>
            <p className="text-lg text-gray-600">Body Large: Luxury is the attention to detail, the quality of materials, and the craftsmanship.</p>
            <p className="text-base text-gray-500">Body Standard: Timeless design meets modern functionality for the discerning wearer.</p>
          </div>
        </section>

        {/* Components */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">UI Components</h2>
          <div className="space-y-12">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Buttons</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Action</Button>
                <Button variant="ghost">Ghost Action</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Glassmorphism</h4>
              <div className="glass p-10 rounded-4xl text-center">
                <p className="font-bold">This is a glassmorphic container</p>
                <p className="text-sm text-gray-500">Soft blur and subtle transparency.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customization Manual */}
        <section className="bg-primary p-12 rounded-4xl text-white space-y-6">
          <h2 className="text-3xl font-bold">Customization Manual</h2>
          <div className="space-y-4 text-white/80 leading-loose">
            <p>To update the theme colors globally:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open <code>index.html</code> and locate the <code>tailwind.config</code> script.</li>
              <li>Under the <code>extend.colors</code> object, replace the hex codes for <code>primary</code>, <code>secondary</code>, etc.</li>
              <li>The UI will automatically update as all components use these tailwind utility classes.</li>
              <li>For border radii, update the <code>borderRadius</code> values in the config. We recommend <code>2rem</code> for our soft-minimalist look.</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide;
