import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Container from '../components/Container';
import Input from '../components/Input';
import Title from '../components/Title';
import { LinkStyled } from '../components/LinkStyled';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { C_PRIMARY_DARK } from '../assets/styles/constants';
import { checkUser, getCurrentUser, setCurrentUser } from '../mockDB/users';
import { setModalContent } from '../store/actionCreators';
import Button from '../components/Button';

const schema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
});

type Schema = z.infer<typeof schema>;

const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const user = getCurrentUser();
  if (user) return <Navigate to="/" replace={true} />;

  const onSubmit = (data: Schema) => {
    const user = checkUser(data);

    if (user) {
      setCurrentUser(user);
      navigate('/');
    } else {
      setModalContent('wrongCreds');
    }
  };

  return (
    <Container $maxWidth={420}>
      <Title>Login</Title>
      {state?.message && <p style={{ textAlign: 'center', color: C_PRIMARY_DARK }}>{state.message}</p>}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input label='Email' name='email' type='text' />
          <Input label='Password' name='password' type='password' />

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Button type='submit' text='Submit' />
          </div>
        </form>
      </FormProvider>

      <div style={{ textAlign: 'center' }}>
        Don't have an account? <LinkStyled to='/signup'>Sign up!</LinkStyled>
      </div>
    </Container>
  );
};

export default Login;