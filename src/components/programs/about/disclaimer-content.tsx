export function DisclaimerContent() {
  return (
    <div className="space-y-3 text-[12px] leading-relaxed">
      <h2 className="font-bold text-[13px]">Disclaimer</h2>
      <p>
        This portfolio is not affiliated with, endorsed by, or connected to
        Microsoft Corporation in any way.
      </p>
      <p>
        Windows 98™, the Windows logo, Internet Explorer™, MS Paint™, Clippy™
        and other Microsoft trademarks are the property of Microsoft
        Corporation. Their visual design is reproduced here for educational,
        parody and non-commercial purposes under the principles of fair use.
      </p>
      <p>
        Winamp™ is a trademark of Llama Software. The Winamp skin and UI are
        reproduced for aesthetic purposes only.
      </p>
      <p>
        No real floppy disks were harmed in the making of this portfolio. The
        C:\ drive shown in My Computer has 5.21 GB free. This is aspirational.
      </p>
      <p className="text-[11px] text-gray-500 italic">
        © {new Date().getFullYear()} Alexandre Dresch.
      </p>
    </div>
  );
}
