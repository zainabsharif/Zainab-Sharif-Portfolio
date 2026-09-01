const PULSE_COLORS = ["#ff3d81", "#3dffd0", "#7c5cff"];
const CENTER = { x: 50, y: 50 };

export default function ConnectorLines({ positioned, activeId, reducedMotion }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      {positioned.map(({ node, x, y }) => (
        <line
          key={`spoke-${node.id}`}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={x}
          y2={y}
          stroke={node.id === activeId ? "#ff3d81" : "rgba(154,154,174,0.25)"}
          strokeWidth={node.id === activeId ? 0.6 : 0.3}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {positioned.map(({ node, x, y }, i) => {
        const next = positioned[(i + 1) % positioned.length];
        return (
          <line
            key={`ring-${node.id}`}
            x1={x}
            y1={y}
            x2={next.x}
            y2={next.y}
            stroke="rgba(154,154,174,0.18)"
            strokeWidth={0.25}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      {!reducedMotion &&
        positioned.map(({ node, x, y }, i) => (
          <circle key={`pulse-spoke-${node.id}`} r="1.1" fill={PULSE_COLORS[i % PULSE_COLORS.length]}>
            <animateMotion
              dur={`${3 + (i % 3)}s`}
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
              path={`M ${CENTER.x} ${CENTER.y} L ${x} ${y} L ${CENTER.x} ${CENTER.y}`}
            />
          </circle>
        ))}

      {!reducedMotion &&
        positioned.map(({ node, x, y }, i) => {
          const next = positioned[(i + 1) % positioned.length];
          return (
            <circle
              key={`pulse-ring-${node.id}`}
              r="0.9"
              fill={PULSE_COLORS[(i + 1) % PULSE_COLORS.length]}
              opacity="0.85"
            >
              <animateMotion
                dur={`${4 + (i % 4)}s`}
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
                path={`M ${x} ${y} L ${next.x} ${next.y}`}
              />
            </circle>
          );
        })}
    </svg>
  );
}
