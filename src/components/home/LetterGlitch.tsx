import { useEffect, useRef } from 'react';

interface LetterGlitchProps {
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  theme?: 'primary' | 'accent' | 'secondary' | 'custom';
  customColors?: string[];
  opacity?: number;
}

const getThemeColors = (theme: string = 'primary', customColors: string[] = []) => {
  if (theme === 'custom' && customColors.length > 0) {
    return customColors;
  }
  
  // Custom color palette
  const colorMap: Record<string, string[]> = {
    primary: ['#2b4539', '#61dca3', '#61b3dc'],
    accent: ['#61dca3', '#2b4539', '#61b3dc'],
    secondary: ['#61b3dc', '#2b4539', '#61dca3'],
    custom: ['#2b4539', '#61dca3', '#61b3dc']
  };

  return colorMap[theme] || colorMap.primary;
}

const LetterGlitch = ({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
  theme = 'custom', // Set default to 'custom' to use our custom colors
  customColors = ['#2b4539', '#61dca3', '#61b3dc'], // Set default custom colors
  opacity = 0.3 // Slightly increased opacity for better visibility
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lettersRef = useRef<{
    char: string;
    color: string;
    targetColor: string;
    colorProgress: number;
  }[]>([]);
  const gridRef = useRef({ columns: 0, rows: 0 });
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(0);
  const colors = getThemeColors(theme, customColors);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgba(${result.r}, ${result.g}, ${result.b}, ${opacity})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    gridRef.current = { columns, rows };
    const totalLetters = columns * rows;
    lettersRef.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (contextRef.current) {
      contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    const ctx = contextRef.current;
    if (!ctx || lettersRef.current.length === 0) return;

    const { width, height } = canvasRef.current!.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    lettersRef.current.forEach((letter, index) => {
      const x = (index % gridRef.current.columns) * charWidth;
      const y = Math.floor(index / gridRef.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    const updateCount = Math.max(1, Math.floor(lettersRef.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * lettersRef.current.length);
      if (!lettersRef.current[index]) continue;

      lettersRef.current[index].char = getRandomChar();
      lettersRef.current[index].targetColor = getRandomColor();

      if (!smooth) {
        lettersRef.current[index].color = lettersRef.current[index].targetColor;
        lettersRef.current[index].colorProgress = 1;
      } else {
        lettersRef.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    lettersRef.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d');
    if (!contextRef.current) return;

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [glitchSpeed, smooth, theme, customColors, opacity]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,0.7)_100%)]"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>
      )}
    </div>
  );
};

export default LetterGlitch;
