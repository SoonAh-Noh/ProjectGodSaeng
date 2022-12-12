import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material/';
import styled from 'styled-components';
import { useState, useRef, useReducer } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as server_bridge from '../../../controller/server_bridge';

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const UserInfoContainer = ({ data }) => {
  const theme = createTheme();
  const pwRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  const mailRef = useRef();
  const oRef = useRef();
  const xRef = useRef();
  const updateUser = async (e) => {
    e.preventDefault();
    if (window.confirm('정말로 수정하시겠습니까?')) {
      const res = await server_bridge.axios_instace.post('/updateuserinfo', {
        user_pw: data.USER_PW,
        user_name: nameRef.current.value,
        user_tel: telRef.current.value,
        user_mail: mailRef.current.value,
        user_idx: data.USER_IDX,
        admin_ox: oRef.current.checked ? 'O' : 'X',
      });
      if (res.data === 'success') {
        alert('회원 정보 수정에 성공했습니다!');
      } else {
        alert('회원 정보 수정에 실패했습니다!' + '\r\n' + res.data);
      }
    }
  };
  //사용자 정보 핸들링용 공용 컴포넌트
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            회원정보
          </Typography>
          <Boxs
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  아이디 <input type="text" defaultValue={data.USER_ID} />
                </Grid>
                <Grid item xs={12}>
                  이름{' '}
                  <input
                    type="text"
                    ref={nameRef}
                    defaultValue={data.USER_NAME}
                  />
                </Grid>
                <Grid item xs={12}>
                  이메일{' '}
                  <input
                    type="text"
                    ref={mailRef}
                    defaultValue={data.USER_MAIL}
                  />
                </Grid>

                <Grid item xs={12}>
                  연락처{' '}
                  <input
                    type="text"
                    ref={telRef}
                    defaultValue={data.USER_TEL}
                  />
                </Grid>

                <Grid item xs={12}>
                  관리자 여부
                  {data.ADMIN_OX === 'O' ? (
                    <>
                      <input
                        type="radio"
                        id="admin_o"
                        name="admin"
                        value="O"
                        ref={oRef}
                        defaultChecked
                      />
                      <label htmlFor="admin_o">O</label>
                      <input
                        type="radio"
                        ref={xRef}
                        id="admin_x"
                        name="admin"
                        value="X"
                      />
                      <label htmlFor="admin_x">X</label>
                    </>
                  ) : (
                    <>
                      <input
                        type="radio"
                        id="admin_o"
                        ref={oRef}
                        name="admin"
                        value="O"
                      />
                      <label htmlFor="admin_o">O</label>
                      <input
                        type="radio"
                        id="admin_x"
                        name="admin"
                        value="X"
                        ref={xRef}
                        defaultChecked
                      />
                      <label htmlFor="admin_x">X</label>
                    </>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                onClick={updateUser}
              >
                수정하기
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default UserInfoContainer;
