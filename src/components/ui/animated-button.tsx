import React from 'react';

interface AnimatedButtonProps {
  children: string;
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick }) => {
  return (
    <div className="btn-wrapper">
      <button className="btn" onClick={onClick}>
        <div className="txt-wrapper">
          <span className="txt-1">
            {children.split('').map((letter, index) => (
              <span key={index} className="btn-letter">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </div>
      </button>
      
      <style jsx>{`
        .btn-wrapper {
          position: relative;
          display: inline-block;
        }

        .btn {
          --border-radius: 24px;
          --padding: 4px;
          --transition: 0.4s;
          --button-color: hsl(var(--background));
          --highlight-color-hue: 92deg;

          user-select: none;
          display: flex;
          justify-content: center;
          padding: 0.8em 2em;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.1em;
          font-weight: 600;
          color: hsl(var(--primary-foreground));

          background-color: var(--button-color);

          box-shadow:
            inset 0px 1px 1px rgba(255, 255, 255, 0.2),
            inset 0px 2px 2px rgba(255, 255, 255, 0.15),
            inset 0px 4px 4px rgba(255, 255, 255, 0.1),
            inset 0px 8px 8px rgba(255, 255, 255, 0.05),
            inset 0px 16px 16px rgba(255, 255, 255, 0.05),
            0px -1px 1px rgba(0, 0, 0, 0.02),
            0px -2px 2px rgba(0, 0, 0, 0.03),
            0px -4px 4px rgba(0, 0, 0, 0.05),
            0px -8px 8px rgba(0, 0, 0, 0.06),
            0px -16px 16px rgba(0, 0, 0, 0.08);

          border: solid 1px hsl(var(--primary) / 0.3);
          border-radius: var(--border-radius);
          cursor: pointer;

          transition:
            box-shadow var(--transition),
            border var(--transition),
            background-color var(--transition);
        }

        .btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--border-radius) + var(--padding));
          pointer-events: none;
          background-image: linear-gradient(0deg, hsl(var(--background) / 0.4), hsl(var(--background) / 0.8));
          z-index: -1;
          transition:
            box-shadow var(--transition),
            filter var(--transition);
          box-shadow:
            0 -8px 8px -6px transparent inset,
            0 -16px 16px -8px transparent inset,
            1px 1px 1px hsl(var(--primary) / 0.2),
            2px 2px 2px hsl(var(--primary) / 0.1),
            -1px -1px 1px rgba(0, 0, 0, 0.2),
            -2px -2px 2px rgba(0, 0, 0, 0.1);
        }

        .btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            hsl(var(--primary-foreground)),
            hsl(var(--primary)),
            hsl(var(--primary) / 0.5),
            8%,
            transparent
          );
          background-position: 0 0;
          opacity: 0;
          transition:
            opacity var(--transition),
            filter var(--transition);
        }

        .btn-letter {
          position: relative;
          display: inline-block;
          color: hsl(var(--primary-foreground) / 0.7);
          animation: letter-anim 2s ease-in-out infinite;
          transition:
            color var(--transition),
            text-shadow var(--transition),
            opacity var(--transition);
        }

        @keyframes letter-anim {
          50% {
            text-shadow: 0 0 3px hsl(var(--primary) / 0.8);
            color: hsl(var(--primary-foreground));
          }
        }

        .txt-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 6.4em;
        }

        .txt-1 {
          animation: appear-anim 1s ease-in-out forwards;
        }

        @keyframes appear-anim {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .btn:focus .btn-letter {
          animation:
            focused-letter-anim 1s ease-in-out forwards,
            letter-anim 1.2s ease-in-out infinite;
          animation-delay: 0s, 1s;
        }

        @keyframes focused-letter-anim {
          0%, 100% {
            filter: blur(0px);
          }
          50% {
            transform: scale(2);
            filter: blur(10px) brightness(150%)
              drop-shadow(-36px 12px 12px hsl(var(--primary)));
          }
        }

        .btn:focus::before {
          box-shadow:
            0 -8px 12px -6px hsl(var(--primary) / 0.3) inset,
            0 -16px 16px -8px hsl(var(--primary) / 0.2) inset,
            1px 1px 1px hsl(var(--primary) / 0.3),
            2px 2px 2px hsl(var(--primary) / 0.1),
            -1px -1px 1px rgba(0, 0, 0, 0.2),
            -2px -2px 2px rgba(0, 0, 0, 0.1);
        }

        .btn:focus::after {
          opacity: 0.6;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(100%);
        }

        .btn:active {
          border: solid 1px hsl(var(--primary) / 0.7);
          background-color: hsl(var(--primary) / 0.2);
        }

        .btn:active::before {
          box-shadow:
            0 -8px 12px -6px hsl(var(--primary) / 0.6) inset,
            0 -16px 16px -8px hsl(var(--primary) / 0.8) inset,
            1px 1px 1px hsl(var(--primary) / 0.4),
            2px 2px 2px hsl(var(--primary) / 0.2),
            -1px -1px 1px rgba(0, 0, 0, 0.2),
            -2px -2px 2px rgba(0, 0, 0, 0.1);
        }

        .btn:active::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(200%);
        }

        .btn:active .btn-letter {
          text-shadow: 0 0 1px hsl(var(--primary) / 0.9);
          animation: none;
        }

        .btn:hover {
          border: solid 1px hsl(var(--primary) / 0.4);
        }

        .btn:hover::before {
          box-shadow:
            0 -8px 8px -6px hsl(var(--primary) / 0.6) inset,
            0 -16px 16px -8px hsl(var(--primary) / 0.3) inset,
            1px 1px 1px hsl(var(--primary) / 0.2),
            2px 2px 2px hsl(var(--primary) / 0.1),
            -1px -1px 1px rgba(0, 0, 0, 0.2),
            -2px -2px 2px rgba(0, 0, 0, 0.1);
        }

        .btn:hover::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
        }

        ${Array.from({ length: 13 }, (_, i) => `
          .btn-letter:nth-child(${i + 1}),
          .btn:focus .btn-letter:nth-child(${i + 1}) {
            animation-delay: ${i * 0.08}s;
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default AnimatedButton;