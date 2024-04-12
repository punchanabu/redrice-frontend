
import React from 'react';

// Define the data type for a single rating
interface RatingData {
    label: string;
    percentage: number;
}

// Define the props for the RatingChart component
interface RatingChartProps {
    data: RatingData[];
}

const RatingChart: React.FC<RatingChartProps> = ({ data }) => {
    return (
        <div className="flex flex-col gap-1">
            {data.map((rating, index) => (
                <div key={index} className="flex gap-3 items-center">
                    <label htmlFor={`r${rating.label}`}>{rating.label}</label>
                    <div
                        className="rounded-full w-full h-3 bg-slate-200 flex"
                        id={`r${rating.label}`}
                    >
                        <div
                            className="rounded-full h-full bg-redrice-yellow"
                            style={{ width: `${rating.percentage}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RatingChart;
