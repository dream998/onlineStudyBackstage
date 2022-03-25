import React, { useState } from 'react'
import { postSubsection } from '../../../../services/courseService'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse, Form, Input, Button, message } from 'antd'
import store from '../store';
import { UpdateCourseSubsectionAction } from '../store/actionCreators';
import { getLocalStorageItem, setLocalStorageItem } from '../../../../utils/localstorage';
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

export default function CourseSubsection() {

    let sections = []

    if(store.getState().sectionMessage.length !== 0){
        sections = store.getState().sectionMessage
    }else if(getLocalStorageItem('sectionMessage')&&getLocalStorageItem('sectionMessage').length !== 0){
        sections = getLocalStorageItem("sectionMessage")
    }

    const [sectionMessage, setSectionMessage] = useState([])
    console.log(sectionMessage);
    const onFinish = (values, sectionId) => {
        console.log('Success:', values);
        console.log('sectionId是', sectionId);

        postSubsection(values, sectionId).then(res => {
            console.log(res);
            store.dispatch(UpdateCourseSubsectionAction(res))
            setLocalStorageItem('subsectionMessage',store.getState().subsectionMessage)
            message.success('上传小节成功')
        }).catch(err => {
            console.log(err);
            message.error("上传小节失败")
        })
    };
    store.subscribe(() => {
        console.log(store.getState());
        console.log('sectionMessage是',sectionMessage);
        setSectionMessage([...(store.getState().sectionMessage)
        ])

    })

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header={<h2>章节小节</h2>} key='1'>
                    {
                        sectionMessage.length !== 0  && sectionMessage.map((item, index) => {
                            return (
                                <Collapse key={item.sectionId}>
                                    <Panel header={<h3>{item.sectionOrder + '. ' + item.sectionName}</h3>}>
                                        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={(values) => onFinish(values, item.sectionId)}>
                                            <Form.List
                                                name="subsectionList"
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
                                                                label={'小节 ' + (index + 1)}
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
                                                                    <Input placeholder="请输入小节名称" style={{ width: '60%' }} />
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
                                    </Panel>
                                </Collapse>
                            )
                        })
                    }

                    {/* <button onClick={() => { setSections([...sections, {title:'章节',sections:1}]) }}>添加章节</button> */}
                </Panel>
            </Collapse>
        </div>
    )
}
