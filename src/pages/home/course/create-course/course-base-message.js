import React, { useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, Upload, message } from 'antd'

import { uploadCover } from '../../../../services/coverService'
import { postCourseBase, getLabel } from '../../../../services/courseService'
import store from '../store'
import { UpdateCourseBaseAction, UpdateCourseSectionAction, UpdateCourseSubsectionAction } from '../store/actionCreators'
import { setLocalStorageItem, getLocalStorageItem } from '../../../../utils/localstorage';
const { Panel } = Collapse
export default function CourseBaseMesssage() {

  const [courseKinds, setCourseKinds] = useState([])
  const [courseKindHas, setCourseKindHas] = useState(false)

  useEffect(() => {
    const newKinds = []
    getLabel().then(res=>{
      res.map((item,index)=>{
        newKinds.push({label:item.kind_name, value: item.kind_name})
      })
     setCourseKinds(newKinds)
     setCourseKindHas(true)
    }).catch(err=>{
      console.log(err);
    })
    //setCourseKinds(newKinds)
  
  },[courseKindHas])
  
  function callback(key) {
    console.log(key);
  }
  // 保存课程基本信息
  
  // 保存文件信息以及上传状态
  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false)

  const handleUpload = (courseId) => {
    const formData = new FormData()
    formData.append('cover', file)
    setUploading(true)
    uploadCover(formData, courseId).then((res) => {
      console.log(res);
      //保存到本地和store中 
      store.dispatch(UpdateCourseBaseAction({...store.getState().baseCourseMessage,coverUrl:res.coverUrl}))
      setLocalStorageItem('courseBaseMessage', store.getState().baseCourseMessage)
      message.success('上传成功')
      console.log('baseMessage getState',store.getState());
    })
      .catch((err) => {
        message.error('上传失败')
      })
      .finally(() => {
        setUploading(false)
      })

  }
  // 封面状态改变
  const onCoverChange = ({ file: newfile }) => {
    console.log('文件信息');
    console.log(newfile);
    setFile(newfile);
  };
  // 封面预览
  const onCoverPreview = async file => {

    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    postCourseBase(values)
    .then((res) => {
      console.log('res是', res);
      store.dispatch(UpdateCourseBaseAction(res))
      
      return res
    }).then((res) => {
      console.log(res);
      handleUpload(res.course_id)
      
    })
      .catch((err) => {
        console.log(err);
      })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function onKindChange(checkedValues) {
    console.log('checed =', checkedValues);
  }


  return (
    <div>
      <Form
        name='courseBaseMessage'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">

        <Collapse defaultActiveKey={['1']} onChange={callback}>
          <Panel header={<h2>课程基本信息</h2>} key='1'>
            <Form.Item
              label="课程名称"
              name={"courseName"}
              rules={[
                {
                  required: true,
                  message: '请输入新建课程名称！',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="课程简介"
              name={"courseIntroduction"}
              rules={[
                {
                  required: true,
                  message: '请输入课程简介！',
                },
              ]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="课程种类"
              name={"courseKinds"}
              rules={[
                {
                  required: true,
                  message: '请选择课程种类！',
                },
              ]}>
              <Checkbox.Group options={courseKinds} onChange={onKindChange}>


              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="课程公告"
              name={"courseAnnouncement"}
              rules={[
                {
                  required: true,
                  message: '请输入课程公告！',
                },
              ]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="课程封面"
              name={"courseCover"}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                file={file}
                beforeUpload={() => { return false }}
                onChange={onCoverChange}
                onPreview={onCoverPreview}
              >
                {!file.name && "+ Upload"}
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={JSON.stringify(file) === ''}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? 'Uploading' : 'Start Upload'}
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Form.Item>
          </Panel>

        </Collapse>
      </Form>





    </div>
  )
}
