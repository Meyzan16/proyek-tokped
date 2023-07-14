import React from "react";
import { ProjectInterface } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions";
import ProjectCard from "@/components/ProjectCard";
import Categories from "@/components/Categories";
type ProjectsSearch = {
    projectSearch: {
        edges: {node: ProjectInterface}[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        }
    }
}

type SearchParams = {
    category?: string;
}

type Props = {
    searchParams: SearchParams;
}

const Home = async ({searchParams: { category }}: Props) => {

            const data = await fetchAllProjects(category) as ProjectsSearch;

            const projectsToDisplay = data?.projectSearch?.edges || [];
        
            if(projectsToDisplay.length === 0) {
                
                return (
                    <section className="flexStart flex-col paddings">
                        <Categories />
        
                        <p className="no-result-text text-center">
                            No anime collection found, go create some first.
                        </p>
        
                    </section>
                )
        
            }

            console.log(projectsToDisplay);

    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />

            <section className="projects-grid">
                {
                    projectsToDisplay.map(
                        ({node}: {node: ProjectInterface}) => 
                    (
                        <ProjectCard 
                            key={node?.id}
                            id={node?.id}
                            image={node?.image}
                            genre={node?.genre}
                            episode={node?.episode}
                            title={node?.title}
                            name={node?.createdBy?.name}
                            avatarUrl={node?.createdBy?.avatarUrl}
                            userId={node?.createdBy?.id}

                        />
                    )
                    )
                }

            </section>

        </section>
    )
}

export default Home;
