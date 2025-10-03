import Logo3dStories from '../Svg/Logo3dStories'
import './Category.css'
import { Link } from 'react-router-dom'

const Category = ({ name, sub, uni, img, link }) => {
    const src = String(import.meta.env.BASE_URL + '/' + img).replace(/\/\//g, '/')
    const formattedSub = (sub ?? '').replaceAll('/n', '\n')
    return (
        <div className="Category">
            <Link to={link} aria-label="Link to category">
                <div className="category-thumb">
                    <img src={src} alt={name} loading="lazy" />
                </div>
                <h3 className="mt-2 text-center text-2xl">{name}</h3>
                <p className="mb-2 mt-[0!important] text-center" style={{ whiteSpace: 'pre-line' }}>
                    {formattedSub}
                </p>
                <span>{uni}</span>
            </Link>
        </div>
    )
}

export default Category
