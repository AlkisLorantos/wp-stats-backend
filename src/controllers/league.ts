import { Request, Response } from "express";
import { getLeagues, getLeague, createLeague, updateLeague, deleteLeague } from "../services/league";

export const showMany = async (req: Request, res: Response): Promise<void> => {
    try {
        const leagues = await getLeagues();

        if (!leagues.length) {
            res.status(404).json({ message: "No leagues found" });
            return
        }

        res.status(200).json({ data: leagues });
        return
    } catch (error) {
        console.error("Error fetching leagues:", error);
        res.status(500).json({ message: "Server error", error: error.message });
        return
    }
};

export const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const { leagueId } = req.params;
        const league = await getLeague(Number(leagueId));

        if (!league) {
            res.status(404).json({ error: "League not found" });
            return
        }

        res.status(200).json({ data: league });
        return
    } catch (error) {
        console.error("Error fetching league:", error);
        res.status(500).json({ message: "Server error", error: error.message });
        return
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, season } = req.body;

        if (!name || !season) {
            res.status(400).json({ error: "Name and season are required" });
            return
        }

        const league = await createLeague({ name, season });

        res.status(201).json({ data: league });
        return
    } catch (error) {
        console.error("Error creating league:", error);
        res.status(500).json({ message: "Server error", error: error.message });
        return
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, season } = req.body;

        const league = await updateLeague(Number(id), { name, season });

        res.status(200).json({ data: league });
        return
    } catch (error) {
        console.error("Error updating league:", error);
        res.status(500).json({ message: "Server error", error: error.message });
        return
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        await deleteLeague(Number(id));

        res.status(200).json({ message: "League deleted successfully" });
        return
    } catch (error) {
        console.error("Error deleting league:", error);
        res.status(500).json({ message: "Server error", error: error.message });
        return
    }
};
