import React, { useState } from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse, Form, Input, Button, Checkbox, Upload, message } from 'antd'
import store from '../store';
import { postSection } from '../../../../services/courseService';
import { UpdateCourseSectionAction } from '../store/actionCreators';
import { setLocalStorageItem, getLocalStorageItem } from '../../../../utils/localstorage';
const { Panel } = Collapse

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

export default function CourseSection() {


    const onFinish = (values) => {
        console.log('Success:', values);
        const courseId = store.getState().baseCourseMessage.course_id || getLocalStorageItem('courseBaseMessage').course_id
        console.log('courseSections中的courseId',courseId);
        postSection(values,courseId).then(res=>{
            console.log(res);
            store.dispatch(UpdateCourseSectionAction(res))
            setLocalStorageItem('sectionMessage',store.getState().sectionMessage)
            console.log(store.getState());
            message.success("章节上传成功！")
        }).catch(err => {
            console.log(err);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header={<h2>课程章节</h2>} key='1'>
                    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                        <Form.List
                            name="sectionList"
                            rules={[
                                {
                                    validator: async (_, sections) => {
                                        if (!sections || sections.length < 2) {
                                            return Promise.reject(new Error('At least 2 passengers'));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(formItemLayout)}
                                            label={'章节 '+(index+1)}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input passenger's name or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="请输入章节名称" style={{ width: '60%' }} />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: '60%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add field
                                        </Button>
                                        
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* <button onClick={() => { setSections([...sections, {title:'章节',sections:1}]) }}>添加章节</button> */}
                </Panel>
            </Collapse>
        </div>
    )
}
