<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Report::with('project');

        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        $reports = $query->get();

        return response()->json([
            'success' => true,
            'data' => $reports
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'week' => 'required|integer|min:1',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('reports', $fileName, 'public');
        }

        $report = Report::create([
            'project_id' => $request->project_id,
            'week' => $request->week,
            'file_path' => $filePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Report uploaded successfully',
            'data' => $report->load('project')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        return response()->json([
            'success' => true,
            'data' => $report->load('project')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'sometimes|required|exists:projects,id',
            'week' => 'sometimes|required|integer|min:1',
            'file' => 'sometimes|file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = $request->only(['project_id', 'week']);

        if ($request->hasFile('file')) {
            // Delete old file
            if ($report->file_path && Storage::disk('public')->exists($report->file_path)) {
                Storage::disk('public')->delete($report->file_path);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('reports', $fileName, 'public');
            $updateData['file_path'] = $filePath;
        }

        $report->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Report updated successfully',
            'data' => $report->load('project')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        // Delete file from storage
        if ($report->file_path && Storage::disk('public')->exists($report->file_path)) {
            Storage::disk('public')->delete($report->file_path);
        }

        $report->delete();

        return response()->json([
            'success' => true,
            'message' => 'Report deleted successfully'
        ]);
    }

    /**
     * Download the report file.
     */
    public function download(Report $report)
    {
        if (!$report->file_path || !Storage::disk('public')->exists($report->file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found'
            ], 404);
        }

        return Storage::disk('public')->download($report->file_path);
    }
}
