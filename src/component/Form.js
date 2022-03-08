import { useState, useEffect, useContext } from 'react'
import FormInput from './FormInput'
import FormDataContext from '../Context'
function Form({ modalOpen }) {
    const [idFocus, setIdFocus] = useState(true)
    const [pwdFocus, setPwdFocus] = useState(true)
    const [pwdChkFocus, setPwdChkFocus] = useState(true)
    const { formData } = useContext(FormDataContext)
    const [errMessage, setErrMessage] = useState({
        id: '',
        pwd: '',
        pwdChk: '',
    })

    const ERR_MESSAGE = {
        0: '',
        required: '필수 정보입니다.',
        errorId:
            '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
        errorPwd: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
        errorPwdChk: '비밀번호가 일치하지 않습니다.',
    }

    useEffect(() => {
        if (!idFocus) {
            const errno = validator('id', formData['id'])
            setErrMessage({ ...errMessage, id: ERR_MESSAGE[errno] })
        } else {
            setErrMessage({ ...errMessage, id: '' })
        }
    }, [idFocus])
    useEffect(() => {
        if (!pwdFocus) {
            const errno = validator('pwd', formData['pwd'])
            setErrMessage({ ...errMessage, pwd: ERR_MESSAGE[errno] })
        } else {
            setErrMessage({ ...errMessage, pwd: '' })
        }
    }, [pwdFocus])
    useEffect(() => {
        if (!pwdChkFocus) {
            const errno = validator(
                'pwdChk',
                formData['pwdChk'],
                formData['pwd']
            )
            setErrMessage({ ...errMessage, pwdChk: ERR_MESSAGE[errno] })
        } else {
            setErrMessage({ ...errMessage, pwdChk: '' })
        }
    }, [pwdChkFocus])

    const validator = (type, data, check) => {
        if (data.length === 0) return 'required'
        const idReg = /^[A-Za-z0-9_-]{5,20}$/
        const pwdReg = /^[A-Za-z0-9]{8,16}$/
        switch (type) {
            case 'id':
                return idReg.test(data) ? 0 : 'errorId'
            case 'pwd':
                return pwdReg.test(data) ? 0 : 'errorPwd'
            case 'pwdChk':
                return check === data ? 0 : 'errorPwdChk'
            default:
                return
        }
    }

    //form handlers
    const onSubmitForm = (e) => {
        e.preventDefault()
        const idV = validator('id', formData['id'])
        const pwdV = validator('pwd', formData['pwd'])
        const pwdChkV = validator('pwdChk', formData['pwdChk'], formData['pwd'])

        if (idV + pwdV + pwdChkV === 0) {
            modalOpen()
        }
        setIdFocus(false)
        setPwdFocus(false)
        setPwdChkFocus(false)
    }

    //id Input handlers
    const onFocusId = (e) => {
        setIdFocus(true)
    }
    const onFocusOutId = (e) => {
        setIdFocus(false)
    }

    //password input handlers
    const onFocusPwd = (e) => {
        setPwdFocus(true)
    }
    const onFocusOutPwd = (e) => {
        setPwdFocus(false)
    }

    //password check handlers
    const onFocusPwdChk = (e) => {
        setPwdChkFocus(true)
    }
    const onFocusOutPwdChk = (e) => {
        setPwdChkFocus(false)
    }
    return (
        <form
            id="form"
            className="w-full max-w-md m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            autoComplete="off"
            onSubmit={onSubmitForm}
        >
            <div className="mb-4">
                <FormInput
                    label={'아이디'}
                    id={'id'}
                    errMessage={errMessage['id']}
                    props={{
                        type: 'text',
                        placeholder: '아이디를 입력해주세요.',
                        autoFocus: true,
                        //onChange: onChangeId,
                        onFocus: onFocusId,
                        onBlur: onFocusOutId,
                    }}
                />
            </div>
            <div className="mb-4">
                <FormInput
                    label={'비밀번호'}
                    id={'pwd'}
                    errMessage={errMessage['pwd']}
                    props={{
                        type: 'password',
                        placeholder: '비밀번호를 입력해주세요.',
                        //onChange: onChangePwd,
                        onFocus: onFocusPwd,
                        onBlur: onFocusOutPwd,
                    }}
                />
            </div>
            <div className="mb-6">
                <FormInput
                    label={'비밀번호 확인'}
                    id={'pwdChk'}
                    errMessage={errMessage['pwdChk']}
                    props={{
                        type: 'password',
                        placeholder: '비밀번호 확인을 입력해주세요.',
                        //onChange: onChangePwdChk,
                        onFocus: onFocusPwdChk,
                        onBlur: onFocusOutPwdChk,
                    }}
                />
            </div>
            <div className="flex items-center justify-center">
                <input
                    id="submit"
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                    value="가입하기"
                />
            </div>
        </form>
    )
}
export default Form
