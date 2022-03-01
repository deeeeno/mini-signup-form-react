import './App.css'
import { useState, useEffect } from 'react'
function App() {
    const [id, setId] = useState('')
    const [idFocus, setIdFocus] = useState(true)
    const [idValidate, setIdValidate] = useState(0)
    const [pwd, setPwd] = useState('')
    const [pwdFocus, setPwdFocus] = useState(true)
    const [pwdValidate, setPwdValidate] = useState(0)
    const [pwdChk, setPwdChk] = useState('')
    const [pwdChkFocus, setPwdChkFocus] = useState(true)
    const [pwdChkValidate, setPwdChkValidate] = useState(0)
    const [fontSize, setFontSize] = useState(16)
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
            document
                .querySelector('#id')
                .classList.toggle('border-red-600', idValidate !== 0)
        }
    }, [idValidate, idFocus])
    useEffect(() => {
        if (!pwdFocus) {
            document
                .querySelector('#pw')
                .classList.toggle('border-red-600', pwdValidate !== 0)
        }
    }, [pwdValidate, pwdFocus])
    useEffect(() => {
        if (!pwdChkFocus) {
            document
                .querySelector('#pw-check')
                .classList.toggle('border-red-600', pwdChkValidate !== 0)
        }
    }, [pwdChkValidate, pwdChkFocus])
    useEffect(() => {
        document.querySelector('html').style.fontSize = `${fontSize}px`
    }, [fontSize])

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
        const idV = validator('id', id)
        const pwdV = validator('pwd', pwd)
        const pwdChkV = validator('pwdChk', pwdChk, pwd)

        if (idV + pwdV + pwdChkV === 0) {
            document.querySelector('#modal').showModal()
        }
        setIdValidate(idV)
        setPwdValidate(pwdV)
        setPwdChkValidate(pwdChkV)
        setIdFocus(false)
        setPwdFocus(false)
        setPwdChkFocus(false)
    }

    //approve, cancel btn handlers
    const onClickCancel = (e) => {
        document.querySelector('#modal').close()
    }
    const onClickApprove = (e) => {
        alert('가입되었습니다 🥳')
        document.querySelector('#modal').close()
    }

    //increase, decrease btn handlers
    const onClickIncrease = (e) => {
        setFontSize((prev) => prev + 1)
    }
    const onClickDecrease = (e) => {
        setFontSize((prev) => prev - 1)
    }
    //id Input handlers
    const onChangeId = (e) => {
        setId(e.target.value)
    }
    const onFocusId = (e) => {
        setIdFocus(true)
    }
    const onFocusOutId = (e) => {
        setIdValidate(validator('id', id))
        setIdFocus(false)
    }

    //password input handlers
    const onChangePwd = (e) => {
        setPwd(e.target.value)
    }
    const onFocusPwd = (e) => {
        setPwdFocus(true)
    }
    const onFocusOutPwd = (e) => {
        setPwdValidate(validator('pwd', pwd))
        setPwdFocus(false)
    }

    //password check handlers
    const onChangePwdChk = (e) => {
        setPwdChk(e.target.value)
    }
    const onFocusPwdChk = (e) => {
        setPwdChkFocus(true)
    }
    const onFocusOutPwdChk = (e) => {
        setPwdChkValidate(validator('pwdChk', pwdChk, pwd))
        setPwdChkFocus(false)
    }
    return (
        <>
            <section className="form-wrapper">
                <form
                    id="form"
                    className="w-full max-w-md m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    autoComplete="off"
                    onSubmit={onSubmitForm}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="id"
                        >
                            아이디
                        </label>
                        <input
                            id="id"
                            autoFocus={true}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            onChange={onChangeId}
                            onFocus={onFocusId}
                            onBlur={onFocusOutId}
                        />
                        <div
                            id="id-msg"
                            className="mt-1 mb-3 text-xs text-red-500"
                        >
                            {!idFocus ? ERR_MESSAGE[idValidate] : ''}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="pw"
                        >
                            비밀번호
                        </label>
                        <input
                            id="pw"
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight"
                            placeholder="비밀번호를 입력해주세요"
                            autoComplete="off"
                            onChange={onChangePwd}
                            onFocus={onFocusPwd}
                            onBlur={onFocusOutPwd}
                        />
                        <div
                            id="pw-msg"
                            className="mt-1 mb-3 text-xs text-red-500"
                        >
                            {!pwdFocus ? ERR_MESSAGE[pwdValidate] : ''}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="pw-check"
                        >
                            비밀번호 확인
                        </label>
                        <input
                            id="pw-check"
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            placeholder="비밀번호 확인을 입력해주세요."
                            autoComplete="off"
                            onChange={onChangePwdChk}
                            onFocus={onFocusPwdChk}
                            onBlur={onFocusOutPwdChk}
                        />
                        <div
                            id="pw-check-msg"
                            className="mt-1 mb-3 text-xs text-red-500"
                        >
                            {!pwdChkFocus ? ERR_MESSAGE[pwdChkValidate] : ''}
                        </div>
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
                <footer className="text-center text-gray-500 text-xs">
                    ©2022 Hanameee Corp. All rights reserved
                </footer>
            </section>
            <aside
                id="font-control-box"
                className="flex fixed bottom-0 right-0"
            >
                <button
                    id="increase-font-btn"
                    className="bg-white text-gray-500 border border-gray-300 hover:bg-red-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                    onClick={onClickIncrease}
                    disabled={fontSize === 20}
                >
                    +
                </button>
                <button
                    id="decrease-font-btn"
                    className="bg-white text-gray-500 border border-gray-300 hover:bg-blue-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                    onClick={onClickDecrease}
                    disabled={fontSize === 12}
                >
                    -
                </button>
            </aside>
            <dialog id="modal" className="rounded-lg shadow-xl text-left">
                <div className="w-full rounded-lg">
                    <div className="p-6 mt-3">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            입력하신 내용을 확인해주세요.
                        </h3>
                        <div className="text-left">
                            <div className="mt-2">
                                아이디
                                <p
                                    id="confirm-id"
                                    className="text-sm text-blue-500 bold"
                                >
                                    {id}
                                </p>
                            </div>
                            <div className="mt-2">
                                비밀번호
                                <p
                                    id="confirm-pw"
                                    className="text-sm text-blue-500 bold"
                                >
                                    {pwd}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex justify-center rounded-lg">
                        <button
                            id="cancel-btn"
                            type="button"
                            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 mr-2"
                            onClick={onClickCancel}
                        >
                            취소하기
                        </button>
                        <button
                            id="approve-btn"
                            type="button"
                            className="border border-transparent bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                            onClick={onClickApprove}
                        >
                            가입하기
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default App
