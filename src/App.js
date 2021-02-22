import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  routes,
  Homepage,
  StaggeredReveals,
  StaggeredElementPosition,
  PinnedContent,
  HorizontalGallery,
} from "./pages";

import Layout from "./components/Layout";

import "./App.css";

const Example1 = () => <div>example - 1</div>;
const Example2 = () => <div>example - 2</div>;

const App = () => {
  return (
    <Router>
      <Layout routes={routes}>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/ex-1" component={Example1} />
          <Route path="/ex-2" component={Example2} />
          <Route path="/staggered-reveals" component={StaggeredReveals} />
          <Route
            path="/staggered-element-position"
            component={StaggeredElementPosition}
          />
          <Route path="/pinned-content" component={PinnedContent} />
          <Route path="/hoizontal-gallery" component={HorizontalGallery} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
