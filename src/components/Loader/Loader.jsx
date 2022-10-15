import { Grid } from "react-loader-spinner";
import styles from './Loader.module.css'

const Loader = () => {
    return (
        <div className={styles.Loader}>
            <Grid
                height={100}
                width={100}
                radius={12}
                color="teel"
                ariaLabel="grid-loading"
                // wrapperClass={{}}
                // wrapperStyle=" "
            visible={true} />
        </div>
    )
}

export default Loader;

