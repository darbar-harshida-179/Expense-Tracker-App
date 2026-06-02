// frontend/src/components/__tests__/Loading.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Loading from "../Loading";

describe("Loading", () => {

    test("renders default loading text", () => {

        render(
            <Loading />
        );

        expect(
            screen.getByText("Loading...")
        ).toBeInTheDocument();
    });

    test("renders custom loading text", () => {

        render(
            <Loading text="Please wait..." />
        );

        expect(
            screen.getByText("Please wait...")
        ).toBeInTheDocument();
    });

    test("renders full screen loading by default", () => {

        render(
            <Loading />
        );

        expect(
            screen.getByText("Loading...")
        ).toBeInTheDocument();
    });

    test("renders inline loading when fullScreen is false", () => {

        render(
            <Loading
                text="Saving..."
                fullScreen={false}
            />
        );

        expect(
            screen.getByText("Saving...")
        ).toBeInTheDocument();
    });

});