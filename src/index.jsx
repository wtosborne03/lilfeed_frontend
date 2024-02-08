import { render } from 'preact';
import Router from 'preact-router';
import { Header } from './components/Header.jsx';
import { Index } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { useEffect } from 'preact/hooks';
import Space from './pages/Space/index.jsx';
import { ThemeProvider } from "@material-tailwind/react";
import BlogPostEditor from './pages/Write/index.jsx';
import ProfileEditPage from './pages/EditPage/index.jsx';

export function App() {

	return (
		<ThemeProvider>
			<main>
				<Router>
					<Index path="/" />
					<Space path="/:number" />
					<BlogPostEditor path="/write" />
					<ProfileEditPage path="/edit" />
					<NotFound default />
				</Router>
			</main>
		</ThemeProvider>
	);
}

render(<App />, document.getElementById('app'));
