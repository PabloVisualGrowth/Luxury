import React from "react";
import { Link, useParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Resource() {
    const { id } = useParams();

    return (
        <div className="bg-[#FDFBF9] min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-6 py-32 text-center">
                <h1 className="text-3xl font-bold text-[#5C3D2E] mb-4">Resource Page</h1>
                <p className="text-[#5C3D2E]/70 mb-8">Resource details for ID: {id} are coming soon.</p>
                <Link to={createPageUrl("Resources")}>
                    <Button className="bg-[#C4714A] hover:bg-[#b36540]">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Resources
                    </Button>
                </Link>
            </div>
        </div>
    );
}
