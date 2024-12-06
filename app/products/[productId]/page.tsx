"use client";
import React,{use} from "react";
import {useGetProductByIdQuery} from "@/lib/features/products/productApiSlice";
import ProductDetailItem from "@/app/components/product/ProductDetailItem";
import ProductReviewPage from "@/app/components/productReview/ProductReviewPage";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataFetching from "@/app/components/fetch/DataFetching";
import ThemeButton from "@/app/components/button/ThemeButton";

export default function Page({params}:{params:Promise<{productId:string}>}){

    const {productId} = use(params);

    const {data:product,isError,isFetching,isLoading,isSuccess} = useGetProductByIdQuery(productId);

    return(
        <>
            <DataFetching
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
            >
                {(product && !isFetching) && (
                    <>
                        <ProductDetailItem productIdForUse={productId} product={product}/>

                        <Accordion
                            disableGutters
                            elevation={0}
                            square
                            sx={{
                                margin: "20px 0px",
                                border: "none",
                                borderTop: "1px solid #ccc",
                                borderBottom: "1px solid #ccc",
                                backgroundColor: "transparent",
                                "&:before": {
                                display: "none",
                                    },
                                }}
                        >
                            <AccordionSummary
                                expandIcon={<ThemeButton><ExpandMoreIcon/></ThemeButton>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <ThemeButton>
                                    {"REVIEWS"}
                                </ThemeButton>
                            </AccordionSummary>

                            <AccordionDetails>
                                <ProductReviewPage productId={productId}/>
                            </AccordionDetails>
                        </Accordion>
                    </>
                )}
            </DataFetching>
        </>
    )
}