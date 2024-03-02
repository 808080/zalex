import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { isAvailableEmail } from '../utils/functions';
import Container from '../components/Container';
import { LinkStyled } from '../components/LinkStyled';
import Title from '../components/Title';
import Input from '../components/Input';
import { addUser, getCurrentUser } from '../mockDB/users';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const schema = z.object({
	email: z.string()
		.email('Must be a valid email')
		.refine((val) => val.trim() !== '', {
			message: 'Required',
		})
		.refine(async (val) => {
			return await isAvailableEmail(val);
		}, 'This email already taken'),
	password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
	confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
	message: 'Passwords must match',
	path: ['confirm'],
});

type Schema = z.infer<typeof schema>;

const Signup = () => {
	const navigate = useNavigate();

	const methods = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: 'all',
		criteriaMode: 'all',
		defaultValues: {
			email: '',
			password: '',
			confirm: ''
		}
	});

	const user = getCurrentUser();
	if (user) return <Navigate to="/" replace={true} />;

	const onSubmit = ({ email, password }: Schema) => {
		addUser({ email, password });
		navigate('/login', { state: { message: 'Account was created successfully!' } });
	};

	return (
		<Container $maxWidth={420}>
			<Title>Sign up</Title>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Input label='Email' name='email' type='text' />
					<Input label='Password' name='password' type='password' />
					<Input label='Confirm password' name='confirm' type='password' />

					<div style={{ textAlign: 'center', marginBottom: '20px' }}>
						<Button type='submit' text='Submit' />
					</div>
				</form>
			</FormProvider>

			<div style={{ textAlign: 'center' }}>
				Already have an account? <LinkStyled to='/login'>Log in!</LinkStyled>
			</div>
		</Container>
	);
};

export default Signup;