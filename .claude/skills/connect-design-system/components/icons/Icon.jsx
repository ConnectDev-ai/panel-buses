import React from 'react';

/* Connect's icon system is Lucide, drawn on a 24×24 grid with rounded caps
   (UI-KIT - Connect → Icons). The .fig carries ~1,668 Lucide glyphs; rather
   than duplicate the library, this wrapper renders the official Lucide sprite
   from the CDN, matching the file's own instruction to import Lucide packages. */
const CDN = 'https://unpkg.com/lucide-static@0.544.0/icons';

export function Icon({ name = 'circle', size = 24, color = 'currentColor', strokeWidth = 2, title, style, className }) {
  const [markup, setMarkup] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    fetch(`${CDN}/${name}.svg`)
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((t) => { if (live) setMarkup(t.replace(/<svg[^>]*>|<\/svg>/g, '')); })
      .catch(() => { if (live) setMarkup(''); });
    return () => { live = false; };
  }, [name]);
  return (
    <svg
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: markup || '' }}
    />
  );
}
export default Icon;
