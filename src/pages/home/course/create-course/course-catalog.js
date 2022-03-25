import React, { memo, useState, useRef } from 'react'
import { Collapse, Menu, Upload, Button, message, Form, Input, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { getCatalog } from '../../../../services/courseService'
import { getLocalStorageItem } from '../../../../utils/localstorage'
import { uploadFile, uploadVideo, postChoiceQuestions, postJudgeQuestions } from '../../../../services/courseService';

import { CatalogWrapper } from './style'
const { Panel } = Collapse
const { SubMenu } = Menu
const { Option } = Select
const CourseCatalog = memo(() => {

    const [catalog, setCatalog] = useState([])
    const [currentSubsectionId, setCurrentSubsectionId] = useState(0)
    const [choiceQuestionList, setChoiceQuestionList] = useState([{
        question: '',
        choiceA: '',
        choiceB: '',
        choiceC: '',
        choiceD: '',
        answer: ''
    }])
    const [judgeQuestionList, setJudgeQuestionList] = useState([{
        question: '',
        answer: ''
    }])
    const buttonRef = useRef()

    const updataCatalog = async (e) => {

        await getCatalog(getLocalStorageItem('courseBaseMessage').course_id).then(res => {
            setCatalog([...catalog, ...res])
        })
        //e.target.style.dispaly = 'none'
        buttonRef.current.innerHTML = ''
        //console.log([e.target]);
        console.log();
    }
    //点击目录菜单时设置当前小节id值 
    const catalogMenuClick = (e) => {
        setCurrentSubsectionId(e.key)
        console.log('click', e);
    }
    const [file, setFile] = useState()
    const [uploading, setUploading] = useState(false)

    const [video, setVideo] = useState()
    const [videoUploading, setVideoUploading] = useState(false)
    const handlerVideoUpload = () => {
        const formData = new FormData()
        formData.append('video', video)
        setVideoUploading(true)
        uploadVideo(formData, currentSubsectionId).then((res) => {
            message.success('文件上传成功！')
        }).catch((err) => {
            message.error("文件上传失败！")
        }).finally(() => {
            setVideoUploading(false)
        })

    }
    // 添加选择题
    const addChioceQuestion = ()=>{
        const newChoiceQuestionList = [...choiceQuestionList]
        newChoiceQuestionList.push({
            question: '',
            choiceA: '',
            choiceB: '',
            choiceC: '',
            choiceD: '',
            answer: ''
        })
        
        setChoiceQuestionList(newChoiceQuestionList)
        console.log(choiceQuestionList);
    }
    // 添加判断题
        const addJudgeQuestion = ()=>{
            const newJudgeQuestionList = [...judgeQuestionList]
            newJudgeQuestionList.push({
                question: '',
                answer: ''
            })
            
            setJudgeQuestionList(newJudgeQuestionList)
            console.log(newJudgeQuestionList);
        }
    // 保存选择题
    const onChioceQuestionsFinish = (values) => {
        console.log('Success:', values);
        const newChoiceQuestionList = [...choiceQuestionList]
        newChoiceQuestionList[newChoiceQuestionList.length - 1] = values
        setChoiceQuestionList(newChoiceQuestionList)
    };
    // 保存判断题
    const onJudgeQuestionsFinish = (values) => {
        console.log('Success:', values);
        const newJudgeQuestionList = [...judgeQuestionList]
        newJudgeQuestionList[newJudgeQuestionList.length - 1] = values
        setJudgeQuestionList(newJudgeQuestionList)
    };
    const onJudgeQuestionsFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChoiceQuestionsFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //上传选择题
    const uploadChoiceQuestions = ()=>{
        postChoiceQuestions(choiceQuestionList, currentSubsectionId).then(res=>{
            console.log(res);
            message.success("选择题上传成功！")
        }).catch((err)=>{
            console.log(err);
        })
    }
    // 上传判断题
    const uploadJudgeQuestions = () => {
        postJudgeQuestions(judgeQuestionList, currentSubsectionId).then(res=>{
            console.log(res);
            message.success("判断题上传成功！")
        }).catch(err=>{
            console.log(err);
        })
        console.log(judgeQuestionList);
    }
    const onVideoRemove = (file) => {
        setVideo('')
        return file
    }
    const beforeVideoUpload = file => {
        setVideo(file)
        return false
    }
    const handlerFileUpload = () => {
        const formData = new FormData()
        formData.append('file', file)
        setUploading(true)
        uploadFile(formData, currentSubsectionId).then((res) => {
            message.success('文件上传成功！')
        }).catch((err) => {
            message.error("文件上传失败！")
        }).finally(() => {
            setUploading(false)
        })

    }
    const onFileRemove = (file) => {
        setFile('')
        return file
    }
    const beforeFileUpload = file => {
        setFile(file)
        return false
    }
    return (
        <CatalogWrapper>
            <Collapse>
                <Panel header={<div><h2>课程目录</h2><Button onClick={updataCatalog} ref={buttonRef} type='primary'>更新目录</Button></div>} className='panel'>
                    <Menu
                        className="catalogMenu"
                        onClick={catalogMenuClick}
                        style={{ width: 238 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['1']}
                        mode='inline'>

                        {
                            catalog.map((item, index) => {
                                return (
                                    <SubMenu key={item.section_id} title={(index + 1) + '. ' + item.section_name}>

                                        <Menu.ItemGroup key={item.section_order} >
                                            {
                                                item.subsections.map((subItem, index) => {
                                                    return (
                                                        <Menu.Item key={subItem.subsection_id}>{index + 1 + '. ' + subItem.subsection_name}</Menu.Item>
                                                    )
                                                })
                                            }

                                        </Menu.ItemGroup>
                                        {

                                        }


                                    </SubMenu>
                                )
                            })
                        }



                    </Menu>
                    <div className="catalogContent">
                        <div>
                            <Collapse defaultActiveKey={['1']}>
                                <Panel header='上传文件' key={'1'}>
                                    <Upload onRemove={onFileRemove}
                                        beforeUpload={beforeFileUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>选择文件</Button>
                                    </Upload>
                                    <Button
                                        type='primary'
                                        onClick={handlerFileUpload}
                                        loading={uploading}
                                        style={{ marginTop: 16 }}>
                                        {uploading ? '正在上传' : '开始上传'}
                                    </Button>

                                </Panel>
                                <Panel header='上传视频' key={'2'}>
                                    <Upload onRemove={onVideoRemove}
                                        beforeUpload={beforeVideoUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>选择视频</Button>
                                    </Upload>
                                    <Button
                                        type='primary'
                                        onClick={handlerVideoUpload}
                                        loading={videoUploading}
                                        style={{ marginTop: 16 }}>
                                        {uploading ? '正在上传' : '开始上传'}
                                    </Button>
                                </Panel>
                                <Panel header='上传选择题' key={'3'}>

                                    {
                                        choiceQuestionList.map((item, index) => {
                                            return (
                                                <Form name='choiceQuestion'
                                                    key={index}
                                                    labelCol={{ span: 8 }}
                                                    wrapperCol={{ span: 16 }}
                                                    initialValues={{ remember: true }}
                                                    onFinish={onChioceQuestionsFinish}
                                                    onFinishFailed={onChoiceQuestionsFinishFailed}
                                                    autoComplete="off">

                                                    <Form.Item label={'题目' + ' ' + (index + 1)} name={'questionContent'}>
                                                        <Input placeholder='请输入题目'></Input>
                                                    </Form.Item>
                                                    <Form.Item label='A' name={'choiceA'}>
                                                        <Input placeholder='请输入选项A'></Input>
                                                    </Form.Item>
                                                    <Form.Item label='B' name={'choiceB'}>
                                                        <Input placeholder='请输入选项B'></Input>
                                                    </Form.Item>
                                                    <Form.Item label='C' name={'choiceC'}>
                                                        <Input placeholder='请输入选项C'></Input>
                                                    </Form.Item>
                                                    <Form.Item label='D' name={'choiceD'}>
                                                        <Input placeholder='请输入选项D'></Input>
                                                    </Form.Item>
                                                    <Form.Item label='正确答案' name={'answer'}>
                                                        <Select
                                                            placeholder='请选择正确答案'
                                                            allowClear>
                                                            <Option value='A'>A</Option>
                                                            <Option value='B'>B</Option>
                                                            <Option value='C'>C</Option>
                                                            <Option value='D'>D</Option>

                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button type='primary' htmlType='submit'>确定</Button>
                                                    </Form.Item>


                                                </Form>

                                                
                                            )
                                        })
                                    }
                                    <Button onClick={addChioceQuestion}>添加选择题</Button>
                                    <Button onClick={uploadChoiceQuestions}>上传选择题</Button>

                                </Panel>

                                <Panel header='上传判断题' key={4}>
                                {
                                        judgeQuestionList.map((item, index) => {
                                            return (
                                                <Form name='judgeQuestion'
                                                    key={index}
                                                    labelCol={{ span: 8 }}
                                                    wrapperCol={{ span: 16 }}
                                                    initialValues={{ remember: true }}
                                                    onFinish={onJudgeQuestionsFinish}
                                                    onFinishFailed={onJudgeQuestionsFinishFailed}
                                                    autoComplete="off">

                                                    <Form.Item label={'题目' + ' ' + (index + 1)} name={'questionContent'}>
                                                        <Input placeholder='请输入题目'></Input>
                                                    </Form.Item>
                                                    <Form.Item label='正确答案' name={'answer'}>
                                                        <Select
                                                            placeholder='请选择正确答案'
                                                            allowClear>
                                                            <Option value='current'>对</Option>
                                                            <Option value='error'>错</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button type='primary' htmlType='submit'>确定</Button>
                                                    </Form.Item>


                                                </Form>

                                                
                                            )
                                        })
                                    }
                                    <Button onClick={addJudgeQuestion}>添加判断题</Button>
                                    <Button onClick={uploadJudgeQuestions}>上传判断题</Button>
                                </Panel>
                            </Collapse>


                        </div>

                    </div>
                </Panel>

            </Collapse>
        </CatalogWrapper>
    )
})

export default CourseCatalog