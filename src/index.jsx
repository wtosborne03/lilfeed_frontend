// @ts-nocheck
import 'preact/debug';
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
import { hist } from './axios-client.js';
import { r_store } from './redux/store.js';
import { Provider } from 'react-redux';
import PostPage from './pages/PostPage/index.jsx';
import Explore from './pages/Explore/index.jsx';
import { createPortal } from 'preact/compat';
export function App() {
	return (
		<ThemeProvider>
			<Provider store={r_store}>
				<main>
					{createPortal(
						<>
							<title>lil-Feed</title>
						</>
						, document.head)}
					<Router >
						<Index path="/" />
						<Space path="/:number" />
						<BlogPostEditor path="/write" />
						<Explore path="/explore" />
						<ProfileEditPage path="/edit" />
						<PostPage path="/:number/:slug" />
						<NotFound default />
					</Router>
				</main>
			</Provider>
		</ThemeProvider >
	);
}

render(<App />, document.getElementById('app'));
