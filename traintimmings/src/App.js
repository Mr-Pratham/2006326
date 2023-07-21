import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrainTable from "./components/TrainTable";
import SingleTrain from "./components/SingleTrain"
export default function App() {
  return (
    <div>
      <Header />
      <TrainTable />
      <SingleTrain />
      <Footer />
    </div>
  );
}
