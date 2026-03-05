export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-[#fafaf9]">
      <div className="w-full px-4 py-16 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid w-full gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">discover</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-black/80">
              <a href="/#artists">artists</a>
              <a href="/#studio">studio</a>
              <a href="/#blog">blog</a>
              <a href="/#faq">faq</a>
              <a href="/#aftercare">aftercare</a>
              <a href="/#preparation">preparation</a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">follow us</p>
            <div className="mt-4 flex gap-6 text-sm text-black/80">
              <a href="https://instagram.com/monolithstudio" target="_blank" rel="noopener noreferrer">instagram</a>
              <a href="https://www.youtube.com/@monolithstudionyc" target="_blank" rel="noopener noreferrer">youtube</a>
              <a href="https://www.tiktok.com/@monolithstudio" target="_blank" rel="noopener noreferrer">tiktok</a>
            </div>
            <p className="mt-8 text-sm text-black/60">©2024 AsogFLUX</p>
            <p className="text-sm text-black/60">ALL RIGHTS RESERVED</p>
            <div className="mt-4 flex gap-6 text-xs text-black/50">
              <a href="/privacy-policy">privacy policy</a>
              <a href="/terms">terms of use</a>
            </div>
            <a href="#top" className="mt-6 inline-block text-xs uppercase tracking-wider text-black/60 hover:text-black">
              back to top
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">tattoo styles</p>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-black/80">
              <a href="/#">fine line tattoo</a>
              <a href="/#">single line tattoo</a>
              <a href="/#">micro realism tattoo</a>
              <a href="/#">ornamental tattoo</a>
              <a href="/#">stick & poke tattoo</a>
              <a href="/#">minimalist tattoo</a>
              <a href="/#">geometric tattoo</a>
              <a href="/#">realism tattoo</a>
              <a href="/#">abstract tattoo</a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">AsogFLUX</p>
            <p className="mt-4 text-sm text-black/80">
              77 Washington Avenue, Brooklyn,
              <br />
              NYC, USA, 11205
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-black/60">connect</p>
            <a href="mailto:hello@monolithstudio.com" className="mt-2 block text-sm text-black/80">hello@monolithstudio.com</a>
            <a href="mailto:career@monolithstudio.com" className="mt-1 block text-sm text-black/80">career@monolithstudio.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
