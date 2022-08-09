export function validateUsername(value) {
  if (!value) {
    return '用户名为必填'
  }
  if (value.length < 3 || value.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}

export function validatePassword(value) {
  if (!value) {
    return '密码为必填'
  }
  if (value.length < 3 || value.length > 12) {
    return '密码应该在 3-12 位之间'
  }
  return true
}

export function validateConfirmPassword(val, password) {
  if (val !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
