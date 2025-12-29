// src/app/about/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ClientLayout from "../../components/ClientLayout";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About",
  description: "The story of Socialite - how it started, where it's going",
  openGraph: {
    title: "Socialite | About",
    description: "The story of Socialite - how it started, where it's going",
    type: "website",
  },
};

/*
 * ============================================
 * HOW TO ADD IMAGES TO THIS PAGE
 * ============================================
 * 
 * 1. Place your images in: /public/images/about/
 *    Example: /public/images/about/founder.jpg
 * 
 * 2. Recommended image sizes:
 *    - Hero/wide images: 1200x600px or 16:9 ratio
 *    - Square images: 600x600px
 *    - Portrait images: 400x600px or 2:3 ratio
 * 
 * 3. Supported formats: .jpg, .jpeg, .png, .webp
 *    (webp is smallest file size, recommended)
 * 
 * 4. To use an image, replace the placeholder div with:
 *    <Image 
 *      src="/images/about/your-image.jpg"
 *      alt="Description of image"
 *      width={600}
 *      height={400}
 *      className="rounded-lg"
 *    />
 * 
 * 5. For full-width images, add: className="w-full h-auto"
 * 
 * ============================================
 */

export default function AboutPage() {
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* ============================================
            INTRO SECTION
            ============================================ */}
        <section className="py-12 border-b border-[#d5d5d5]">
          <p className="text-[15px] text-black/80 leading-relaxed mb-6">
            {/* EDIT: Opening paragraph - introduce yourself and the app */}
            Hey everyone,
          </p>
          <p className="text-[15px] text-black/80 leading-relaxed mb-6">
            {/* EDIT: Continue intro */}
            If you&apos;re new here, my name is Zeke Milay and I founded Socialite 
            back in late 2024. This is the story of how it all started.
          </p>

          {/* IMAGE PLACEHOLDER - Founder/Team photo */}
          <div className="my-8">
            {/* 
              TO ADD IMAGE: Replace the div below with:
              <Image 
                src="/images/about/founder.jpg"
                alt="Founder photo"
                width={800}
                height={500}
                className="w-full rounded-lg"
              />
            */}
            <div className="panel-inset rounded-lg aspect-[16/10] flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-[11px] text-black/40 uppercase tracking-wider">
                  Image Placeholder
                </p>
                <p className="text-[10px] text-black/30 mt-1">
                  Recommended: Founder photo or team photo
                </p>
                <p className="text-[9px] text-black/20 mt-1">
                  Size: 1200x750px (16:10 ratio)
                </p>
              </div>
            </div>
            <p className="text-[11px] text-black/50 mt-2 text-center italic">
              {/* EDIT: Image caption */}
              Caption: [Describe what&apos;s in the photo]
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION DIVIDER - Decorative
            ============================================ */}
        <div className="py-6 flex items-center justify-center gap-4">
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
        </div>

        {/* ============================================
            THE BEGINNING - Origin Story
            ============================================ */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-black mb-6">
            {/* EDIT: Section title */}
            How It Started
          </h2>
          
          <p className="text-[15px] text-black/80 leading-relaxed mb-4">
            {/* EDIT: Origin story paragraph 1 */}
            [Write about what inspired you to create Socialite. What problem 
            were you trying to solve? What was the moment you decided to build it?]
          </p>

          <p className="text-[15px] text-black/80 leading-relaxed mb-4">
            {/* EDIT: Origin story paragraph 2 */}
            [Continue your story. Talk about the early days, the challenges, 
            what you learned. Be authentic and personal.]
          </p>

          {/* IMAGE PLACEHOLDER - Early days */}
          <div className="my-8">
            {/* 
              TO ADD IMAGE: Replace the div below with:
              <Image 
                src="/images/about/early-days.jpg"
                alt="Early development"
                width={800}
                height={500}
                className="w-full rounded-lg"
              />
            */}
            <div className="panel-inset rounded-lg aspect-[16/10] flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-[11px] text-black/40 uppercase tracking-wider">
                  Image Placeholder
                </p>
                <p className="text-[10px] text-black/30 mt-1">
                  Idea: Screenshot of early prototype, workspace, or notes
                </p>
              </div>
            </div>
            <p className="text-[11px] text-black/50 mt-2 text-center italic">
              {/* EDIT: Image caption */}
              Caption: [Early prototype / sketches / workspace]
            </p>
          </div>

          <p className="text-[15px] text-black/80 leading-relaxed mb-4">
            {/* EDIT: More origin story */}
            [Add more context. What tools did you use? Who helped you? 
            What were the first features you built?]
          </p>
        </section>

        {/* ============================================
            SECTION DIVIDER
            ============================================ */}
        <div className="py-6 flex items-center justify-center gap-4">
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
        </div>

        {/* ============================================
            MILESTONES - Key Moments
            ============================================ */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-black mb-6">
            {/* EDIT: Section title */}
            Key Moments
          </h2>

          {/* MILESTONE 1 */}
          <div className="mb-10">
            <p className="text-[11px] text-black/40 uppercase tracking-wider mb-2">
              {/* EDIT: Date */}
              [Month Year]
            </p>
            <h3 className="text-lg font-semibold text-black mb-3">
              {/* EDIT: Milestone title */}
              [First Major Milestone]
            </h3>
            <p className="text-[15px] text-black/80 leading-relaxed mb-4">
              {/* EDIT: Describe this milestone */}
              [What happened? Why was it significant? How did it feel?]
            </p>

            {/* IMAGE PLACEHOLDER - Milestone 1 */}
            <div className="panel-inset rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-[11px] text-black/40 uppercase tracking-wider">
                  Image Placeholder
                </p>
                <p className="text-[10px] text-black/30 mt-1">
                  Idea: Screenshot, photo, or graphic for this milestone
                </p>
              </div>
            </div>
          </div>

          {/* MILESTONE 2 */}
          <div className="mb-10">
            <p className="text-[11px] text-black/40 uppercase tracking-wider mb-2">
              {/* EDIT: Date */}
              [Month Year]
            </p>
            <h3 className="text-lg font-semibold text-black mb-3">
              {/* EDIT: Milestone title */}
              [Second Major Milestone]
            </h3>
            <p className="text-[15px] text-black/80 leading-relaxed mb-4">
              {/* EDIT: Describe this milestone */}
              [What happened? Why was it significant?]
            </p>

            {/* IMAGE PLACEHOLDER - Milestone 2 */}
            <div className="panel-inset rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-[11px] text-black/40 uppercase tracking-wider">
                  Image Placeholder
                </p>
                <p className="text-[10px] text-black/30 mt-1">
                  Idea: Screenshot, photo, or graphic for this milestone
                </p>
              </div>
            </div>
          </div>

          {/* MILESTONE 3 - Add more by copying this block */}
          <div className="mb-10">
            <p className="text-[11px] text-black/40 uppercase tracking-wider mb-2">
              {/* EDIT: Date */}
              [Month Year]
            </p>
            <h3 className="text-lg font-semibold text-black mb-3">
              {/* EDIT: Milestone title */}
              [Third Major Milestone]
            </h3>
            <p className="text-[15px] text-black/80 leading-relaxed">
              {/* EDIT: Describe this milestone */}
              [What happened? Why was it significant?]
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION DIVIDER
            ============================================ */}
        <div className="py-6 flex items-center justify-center gap-4">
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
        </div>

        {/* ============================================
            WHAT'S NEXT - Future Vision
            ============================================ */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-black mb-6">
            {/* EDIT: Section title */}
            What&apos;s Next?
          </h2>

          {/* IMAGE PLACEHOLDER - Team/Vision */}
          <div className="my-8">
            <div className="panel-inset rounded-lg aspect-[16/10] flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-[11px] text-black/40 uppercase tracking-wider">
                  Image Placeholder
                </p>
                <p className="text-[10px] text-black/30 mt-1">
                  Idea: Team photo, roadmap graphic, or vision image
                </p>
              </div>
            </div>
            <p className="text-[11px] text-black/50 mt-2 text-center italic">
              {/* EDIT: Image caption */}
              Caption: [The team / Looking ahead]
            </p>
          </div>

          <p className="text-[15px] text-black/80 leading-relaxed mb-4">
            {/* EDIT: Vision paragraph 1 */}
            [Share your vision for Socialite. Where do you see it going? 
            What features are you excited about building?]
          </p>

          <p className="text-[15px] text-black/80 leading-relaxed mb-4">
            {/* EDIT: Vision paragraph 2 */}
            [Talk about the mission. Why does this matter? What change 
            do you want to see in the world?]
          </p>

          {/* HIGHLIGHT BOX - Mission Statement */}
          <div className="panel-chrome rounded-lg p-6 my-8">
            <p className="text-[14px] text-black font-medium leading-relaxed text-center">
              {/* EDIT: Your mission statement or key quote */}
              &quot;[Your mission statement or inspiring quote goes here. 
              Make it memorable.]&quot;
            </p>
          </div>

          <p className="text-[15px] text-black/80 leading-relaxed">
            {/* EDIT: Closing thoughts */}
            [Final thoughts. Thank your supporters. Invite people to join 
            the journey.]
          </p>
        </section>

        {/* ============================================
            SECTION DIVIDER
            ============================================ */}
        <div className="py-6 flex items-center justify-center gap-4">
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
          <span className="text-black/20">✦</span>
        </div>

        {/* ============================================
            CTA SECTION - Join the Journey
            ============================================ */}
        <section className="py-12 text-center">
          <h2 className="text-xl font-bold text-black mb-4">
            {/* EDIT: CTA headline */}
            Find your community! 
          </h2>
          <p className="text-[14px] text-black/60 mb-8 max-w-md mx-auto">
            {/* EDIT: CTA description */}
            Sign up for the waitlist to be the first to experience Socialite.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/waitlist" className="btn-winamp-sm">
              Join Waitlist
            </Link>
            <a
              href="https://instagram.com/socialitehq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-winamp-sm"
            >
              Follow @socialitehq
            </a>
          </div>
        </section>

        {/* Bottom padding */}
        <div className="h-12"></div>
      </div>
    </ClientLayout>
  );
}

/*
 * ============================================
 * QUICK REFERENCE - ADDING IMAGES
 * ============================================
 * 
 * STEP 1: Create folder if it doesn't exist
 *   /public/images/about/
 * 
 * STEP 2: Add your images to that folder
 *   Example files:
 *   - founder.jpg (your photo)
 *   - early-days.png (early screenshots)
 *   - milestone-1.jpg (first milestone)
 *   - team.jpg (team photo)
 * 
 * STEP 3: Replace placeholder divs with Image components
 * 
 *   BEFORE (placeholder):
 *   <div className="panel-inset rounded-lg aspect-[16/10]...">
 *     ...placeholder content...
 *   </div>
 * 
 *   AFTER (real image):
 *   <Image 
 *     src="/images/about/founder.jpg"
 *     alt="Founder of Socialite"
 *     width={800}
 *     height={500}
 *     className="w-full rounded-lg"
 *   />
 * 
 * STEP 4: Update the caption text below each image
 * 
 * ============================================
 * IMAGE SIZE RECOMMENDATIONS
 * ============================================
 * 
 * - Hero images: 1200x750px (16:10)
 * - Wide images: 1200x675px (16:9) 
 * - Square images: 600x600px (1:1)
 * - Portrait images: 400x600px (2:3)
 * 
 * TIP: Compress images before uploading!
 * Use: https://squoosh.app or https://tinypng.com
 * 
 * ============================================
 */
