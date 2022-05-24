import EChartsReact from 'echarts-for-react';
import { Space } from 'antd';
import React, { memo } from 'react';
// 定义饼状图组件
const PiePic = memo((props) => {

    const { choiceCount, judgeCount, choiceCurrentCount, judgeCurrentCount } = props
    console.log(choiceCount, judgeCount, choiceCurrentCount, judgeCurrentCount);
    const choiceOption = {
        title: {
            text: '选择题正确率饼状图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                type: 'pie',
                label: {
                    show: false
                },
                data: [
                    {
                        value: choiceCurrentCount,
                        name: '正确数量'
                    },
                    {
                        value: choiceCount - choiceCurrentCount,
                        name: '错误数量'
                    }
                ]
            }
        ]
    };

    const judgeOption = {
        title: {
            text: '判断题正确率饼状图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                type: 'pie',
                label: {
                    show: false
                },
                data: [
                    {
                        value: judgeCurrentCount,
                        name: '正确数量'
                    },
                    {
                        value: judgeCount - judgeCurrentCount,
                        name: '错误数量'
                    }
                ]
            }
        ]
    };
    const allOption = {
        title: {
            text: '总体正确率饼状图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                type: 'pie',
                label: {
                    show: false
                },
                data: [
                    {
                        value: judgeCurrentCount+choiceCurrentCount,
                        name: '正确数量'
                    },
                    {
                        value: (judgeCount - judgeCurrentCount)+(judgeCount - judgeCurrentCount),
                        name: '错误数量'
                    }
                ]
            }
        ]
    };
    return (
        <div>
            <Space>
                <EChartsReact style={{ width: 400, height: 300 }} option={choiceOption}></EChartsReact>
                <EChartsReact style={{ width: 400, height: 300 }} option={judgeOption}></EChartsReact>
                <EChartsReact style={{ width: 400, height: 300 }} option={allOption}></EChartsReact>
            </Space>
        </div>
    )
})
export default PiePic