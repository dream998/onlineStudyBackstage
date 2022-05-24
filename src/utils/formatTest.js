export default function(res){
    const data = []
            for (let i = 0; i < res.length; i++) {
                const subsections = res[i].subsections
                for (let j = 0; j < subsections.length; j++) {
                    const subsection = subsections[j]
                    const temp = {}
                    temp.section = (i + 1) + '. ' + res[i].section_name
                    temp.subsection = (i + 1) + '.' + (j + 1) + ' ' + subsection.subsection_name

                    temp.choiceQuestions = subsections[j].choiceTest
                    temp.judgeQuestions = subsections[j].judgeTest
                    const studyProcess = subsection.studyprocess
                    if (studyProcess.test_finished === 0 || !subsections[j].choiceTest[0].studentAnswer || !subsections[j].judgeTest[0].studentAnswer) {
                        temp.choiceRate = '暂无数据'
                        temp.judgeRate = '暂无数据'
                    } else {
                        const choiceQuestions = subsections[j].choiceTest
                        const judgeQuestions = subsections[j].judgeTest
                        let choiceCurrentCount = 0
                        let judgeCurrentCount = 0
                        for (let i = 0; i < choiceQuestions.length; i++) {
                            console.log(choiceQuestions[i]);
                            if (choiceQuestions[i].question_answer === choiceQuestions[i].studentAnswer.student_answer) {
                                choiceCurrentCount++
                            }
                            temp.choiceQuestions[i].studentAnswer = choiceQuestions[i].studentAnswer.student_answer

                        }
                        
                        for (let i = 0; i < judgeQuestions.length; i++) {
                            if (judgeQuestions[i].studentAnswer.student_answer === 1) {
                                judgeCurrentCount++
                            }
                            temp.judgeQuestions[i].studentAnswer = judgeQuestions[i].studentAnswer.student_answer == 0 ? '√' : '×'
                            temp.judgeQuestions[i].question_answer = temp.judgeQuestions[i].question_answer == 0 ? '√' : '×'
                        }
                        temp.judgeCurrentCount = judgeCurrentCount
                        temp.judgeCount = judgeQuestions.length
                        temp.choiceCurrentCount = choiceCurrentCount
                        temp.choiceCount = choiceQuestions.length

                        temp.choiceRate = Math.round((choiceCurrentCount / (choiceQuestions.length)) * 100) + '%'
                        temp.judgeRate = Math.round((judgeCurrentCount / (judgeQuestions.length)) * 100) + '%'
                    }

                    data.push(temp)
                }

            }
            return data
}