import Logo3dStories from '../Svg/Logo3dStories'
import './Category.css'

const Category = ({ name, sub, uni, img, link }) => {
    const src = String(import.meta.env.BASE_URL + '/' + img).replace(/\/\//g, '/')
    const formattedSub = (sub ?? '').replaceAll('/n', '\n')
    return (
        <div className="Category">
            <a href={link} aria-label="Link to team member" rel="noreferrer">
               <div className="category-thumb">
                    <img src={src} alt={name} loading="lazy" />
                </div>
                <h3 className="mt-2 text-center text-2xl">{name}</h3>
                <p className="mb-2 mt-[0!important] text-center" style={{ whiteSpace: 'pre-line' }}>
                    {formattedSub}
                </p>
                <span>{uni}</span>
            </a>
        </div>
    )
}

export default Category
