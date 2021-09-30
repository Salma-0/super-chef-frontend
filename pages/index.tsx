
import styles from '@styles/Home.module.css'
import Layout from '@components/Layout'
import Landing from '@components/home/Landing'
import LowerSugarRecipes  from '@components/home/LowerSugarRecipes'
import NewIdeas from '@components/home/NewIdeas'
import Tips from '@components/home/Tips'
import HealthPrecious from '@components/home/HealthPrecious'

export default function Home(props : any) {
  return (
    <Layout {...props}>
        <Landing />
        <LowerSugarRecipes/>
        <NewIdeas />
        <Tips />
        <HealthPrecious />
    </Layout>
  )
}
