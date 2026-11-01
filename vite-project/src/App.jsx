import React, { useState } from 'react';

const PRESET_COLORS = ['#EF4444', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#F97316', '#14B8A6', '#EC4899', '#1F2937', '#FFFFFF'];

export default function App() {
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const getTextColor = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#000000' : '#FFFFFF';
  };

  const rgb = hexToRgb(currentColor);
  const textColor = getTextColor(currentColor);

  return (
    <div style={{ backgroundColor: currentColor, color: textColor, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '30px', fontFamily: 'sans-serif', transition: 'background-color 0.3s' }}>
      
      <header style={{ width: '100%', maxWidth: '500px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
        <span>Color Changer</span>
        <span>React App</span>
      </header>

      <div style={{ background: 'rgba(0,0,0,0.1)', padding: '30px', borderRadius: '20px', textAlign: 'center', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.8 }}>Current HEX Code</p>
        <h1 style={{ fontSize: '42px', margin: '10px 0', fontFamily: 'monospace' }}>{currentColor}</h1>
        <p style={{ fontSize: '14px', marginBottom: '20px' }}>RGB: ({rgb.r}, {rgb.g}, {rgb.b})</p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setCurrentColor('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase())} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '10px', background: 'rgba(255,255,255,0.3)', color: textColor, fontWeight: 'bold', cursor: 'pointer' }}>
            Random Color
          </button>
          <button onClick={() => { navigator.clipboard.writeText(currentColor); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '10px', background: 'rgba(255,255,255,0.3)', color: textColor, fontWeight: 'bold', cursor: 'pointer' }}>
            {copied ? 'Copied!' : 'Copy HEX'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px' }}>
          <span>Pick Custom:</span>
          <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value.toUpperCase())} style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.1)', padding: '15px', borderRadius: '15px' }}>
        {PRESET_COLORS.map((hex) => (
          <button key={hex} onClick={() => setCurrentColor(hex)} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: hex, border: '2px solid white', cursor: 'pointer' }} />
        ))}
      </div>

      <footer style={{ fontSize: '12px', opacity: 0.7 }}>Built with React</footer>
    </div>
  );
}