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

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;
const handleSubmit = (e) => {
  e.preventDefault();
  alert('adsfasdf');
  const data = new FormData(e.currentTarget);
  //   const joinData = {
  //     email: data.get('email'),
  //     name: data.get('name'),
  //     password: data.get('password'),
  //     rePassword: data.get('rePassword'),
  //   };
  console.log();
};

const theme = createTheme();
function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}
const UserInfoContainer = ({ data }) => {
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
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  아이디 <input type="text" defaultValue={data.USER_ID} />
                </Grid>
                <Grid item xs={12}>
                  이름 <input type="text" defaultValue={data.USER_NAME} />
                </Grid>
                <Grid item xs={12}>
                  이메일 <input type="text" defaultValue={data.USER_MAIL} />
                </Grid>

                <Grid item xs={12}>
                  연락처 <input type="text" defaultValue={data.USER_TEL} />
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
                        defaultChecked
                      />
                      <label htmlFor="admin_o">O</label>
                      <input type="radio" id="admin_x" name="admin" value="X" />
                      <label htmlFor="admin_x">X</label>
                    </>
                  ) : (
                    <>
                      <input type="radio" id="admin_o" name="admin" value="O" />
                      <label htmlFor="admin_o">O</label>
                      <input
                        type="radio"
                        id="admin_x"
                        name="admin"
                        value="X"
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
