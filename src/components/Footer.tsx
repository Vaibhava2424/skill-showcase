export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-primary/10">
      <div className="max-w-[120rem] mx-auto px-8 py-12">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-heading uppercase text-sm text-primary tracking-wider mb-2">
              Developer & Designer
            </p>
            <p className="font-paragraph italic text-base text-primary">
              Crafting digital experiences
            </p>
          </div>
          
          <div className="text-right">
            <p className="font-heading uppercase text-sm text-primary tracking-wider mb-2">
              Ready to collaborate?
            </p>
            <p className="font-paragraph italic text-base text-primary">
              Let's build something amazing
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/10">
          <p className="font-heading uppercase text-xs text-primary tracking-wider text-center">
            © 2025 Knox Chase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
