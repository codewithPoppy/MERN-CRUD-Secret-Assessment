import styles from '../../styles/UI/SelectCategory/SelectCategory.module.css'

const SelectCategory = (props) => {
    return(
        <article className={styles.select}>
                <select name={props.name} onChange={props.onChange} value={props.value}>
                    <option value="" selected disabled>
                        Categories
                    </option>
                    <option value="Horror">Horror</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Nonfiction">Nonfiction</option>
                    <option value="Tragedy">Tragedy</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Fairytale">Fairytale</option>
                    <option value="Crime">Crime</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Historical Fiction">
                        Historical Fiction
                    </option>
                    <option value="Humor">Humor</option>
                    <option value="Fictional Diaries">Fictional Diaries</option>
                    <option value="Satire">Satire</option>
                    <option value="Romance">Romance</option>
                    <option value="Dystopian">Dystopian</option>
                    <option value="Memoirs">Memoirs</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="Classic">Classic</option>
                    <option value="Novel">Novel</option>
                    <option value="Science Fiction">Science Fiction</option>
                </select>
            </article>
    )
}

export default SelectCategory;