import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

type Props = {
  data: number[];
  color: string;
};

export function SparklineChart({ data, color }: Props) {
  const chartData = data.map((value, index) => ({ value, index }));
  const min = Math.min(...data);
  const max = Math.max(...data);

  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[min - (max - min) * 0.1, max + (max - min) * 0.1]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
