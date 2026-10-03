import { MapPin } from "lucide-react"

function DestinationInput({
  value,
  onChange,
  error,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
            01 / Destination
          </p>

          <h2 className="mt-1 text-lg font-black">
            Where are you going?
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <MapPin size={18} />
        </div>
      </div>

      <div className="relative">
        <MapPin
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter destination..."
          className={`w-full rounded-xl border bg-[#111113] py-3.5 pl-11 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 ${
            error
              ? "border-red-500/50"
              : "border-white/10"
          }`}
        />
      </div>

      {error && (
        <p className="mt-2 text-[10px] font-semibold text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default DestinationInput