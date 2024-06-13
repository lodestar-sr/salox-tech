/* eslint-disable */
export default async () => {
    const t = {
        ["./call-stats/dtos/call-stats.dto"]: await import("./call-stats/dtos/call-stats.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./call-stats/dtos/call-stats.dto"), { "CallStatsDto": { totalCount: { required: true, type: () => Number }, countWithRecording: { required: true, type: () => Number }, countWithoutRecording: { required: true, type: () => Number }, duration: { required: true, type: () => String } } }], [import("./common/dtos/success.dto"), { "SuccessDto": { success: { required: true, type: () => Boolean }, message: { required: false, type: () => String } } }]], "controllers": [[import("./call-stats/call-stats.controller"), { "CallStatsController": { "getAuthors": { type: t["./call-stats/dtos/call-stats.dto"].CallStatsDto } } }]] } };
};