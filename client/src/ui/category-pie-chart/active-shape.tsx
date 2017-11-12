import * as React from "react";
import { Sector } from "recharts";
import { PIE_SELECTED } from "ui/colors";
import { Category } from "./types";

const RADIAN = Math.PI / 180;

interface ActiveShapeProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: Category;
    percent: number;
    value: any; // ?
}

const lineHeight = 19;

const indicatorGap = 5;
const indicatorSize = 5;

const angleLineLength = 15;

export function ActiveShape(props: ActiveShapeProps) {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const { category } = payload;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    const outerIndicatorRadius = innerRadius - indicatorGap;
    const innerIndicatorRadius = outerIndicatorRadius - indicatorSize;

    const textAnchor = lineHeight/2;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={PIE_SELECTED}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={innerIndicatorRadius}
                outerRadius={outerIndicatorRadius}
                fill={PIE_SELECTED}
            />
            <text
                x={cx}
                y={cy}
                dy={textAnchor - lineHeight}
                textAnchor="middle"
                fill={PIE_SELECTED}
            >
                {category}
            </text>
            <text
                x={cx}
                y={cy}
                dy={textAnchor}
                textAnchor="middle"
                fill="#333"
            >
                {`${value} EUR`}
            </text>
            <text
                x={cx}
                y={cy}
                dy={textAnchor + lineHeight}
                textAnchor="middle"
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
}
